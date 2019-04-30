OVERRIDE_CONFIG_FILE := config/override.js
include make/Makefile

LINT_ENABLED := 1

APP_NAME := app
VENDOR_NAME := vendor
APP_DIR := src
CONFIG_DIR := config

TSC = tsc --build $(CONFIG_DIR)/tsconfig.app.json
TSC_TEST = tsc --build $(CONFIG_DIR)/tsconfig.spec.json
NG2_SLM = slm -i $(1) -o $(2) --ng2
NG2_TEMPLATE_CONCAT = ng2-template-concat -r $(TMPL_DIR) -o $(2) $(1)
UMD_CONCAT = ./bin/umd-concat $(1) >$(2).tmp && $(MV) $(2).tmp $(2)
CREATE_MODULE_LIST = ./bin/create-module-list -r . -o $(2) $(1)

SLM_BUILD_DIR := $(BUILD_DIR)/slm
TS_BUILD_DIR := $(BUILD_DIR)/tsc/app
TS_BUILD_TOUCH := $(BUILD_DIR)/ts_build.touch

FONT_TYPES := *.otf *.eot *.svg *.ttf *.woff *.woff2
COPY_TYPES := *.jpg *.jpe *.jpeg *.png *.gif *.svg *.ico *.json
COPY_TYPES += $(FONT_TYPES)
COPY_IGNORE :=

COPY_FILES :=
COPY_FILES += $(call rwildcards,$(APP_DIR)/,$(COPY_TYPES))
COPY_FILES := $(filter-out $(COPY_IGNORE),$(COPY_FILES))

TS_DIRS := $(APP_DIR)
TS_IGNORE := %.spec.ts
TS_FILES := $(foreach d,$(TS_DIRS),$(call rwildcard,$d/,*.ts))
TS_FILES := $(filter-out $(TS_IGNORE),$(TS_FILES))

TS_TEST_FILES := $(foreach d,$(TS_DIRS),$(call rwildcard,$d/,*.spec.ts))
TS_TEST_LIST := $(BUILD_DIR)/test.list.ts

TMPL_DIR := $(APP_DIR)
TMPL_FILES := $(call rwildcard,$(TMPL_DIR)/components/,*.slm)
TMPL_FILES := $(TMPL_FILES:$(TMPL_DIR)/%.slm=$(SLM_BUILD_DIR)/%.html)

WATCH_FILES := '$(APP_DIR)/**/*' '$(CONFIG_DIR)/**/*' package.json Makefile

MAKEFILES += $(lastword $(MAKEFILE_LIST))

TARGETS += start stop watch min-watch
TEST_TARGETS := test test-watch test-e2e

INCLUDE_PATH := $(INCLUDE_PATH):$(BUILD_DIR)

# $(call build-js, src_files, dist_file[, enable_lint=false])
define build-js
$(call build-and-minify,\
    $(1),\
    $(BUILD_DIR)/js/$(2),\
    $(MIN_DIR)/js/$(2),\
    SOURCE_MAP_CONCAT,SOURCE_MAP_UGLIFY,$(if $3,ESLINT,))
endef
#    CONCAT,UGLIFYJS,$(if $3,ESLINT,))

# $(call build-vendor-js, src_files, dist_file)
define build-vendor-js
$(call build-and-minify,\
    $(1),\
    $(BUILD_DIR)/js/$(2),\
    $(MIN_DIR)/js/$(2),\
    UMD_CONCAT,UGLIFYJS)
endef

# $(call build-ts, src_files, dist_file)
define build-ts
$(call build-and-minify,\
    $(1),\
    $(BUILD_DIR)/js/$(2),\
    $(MIN_DIR)/js/$(2),\
    TSC,SOURCE_MAP_UGLIFY)
endef

# $(eval $(call do-build-tmpl, src_files, build_file))
define do-build-tmpl
$(eval TS_FILES += $(BUILD_DIR)/$(2))
$(call build,\
    $(1),\
    $(BUILD_DIR)/$(2),\
    NG2_TEMPLATE_CONCAT)
endef

# $(call build-tmpl, src_files, build_file)
build-tmpl = $(eval $(call do-build-tmpl,$1,$2))

# $(call build-css, src_file, dist_file)
define build-css
$(call build,\
    $(APP_DIR)/css/$(1),\
    $(BUILD_DIR)/tmp-css/$(2),\
    NODE_SASS, ,SASS_MAKEDEPEND) \
$(call build-and-minify,\
    $(BUILD_DIR)/tmp-css/$(2),\
    $(BUILD_DIR)/css/$(2),\
    $(MIN_DIR)/css/$(2),\
    AUTOPREFIXER,CSSO)
endef

# $(call build-icon-font, font-name)
build-icon-font = $(eval $(call do-build-icon-font,$1))

# $(eval $(call do-build-icon-font, font-name))
define do-build-icon-font
$(eval _fonts := $(addprefix $(DIST_DIR)/fonts/$1/$1,.otf .ttf .woff .woff2 .svg))
$(eval _css := $(BUILD_DIR)/$1.css)
$(eval _deps := $(APP_DIR)/fonts/$1/glyphs)
$(eval _deps += $(call wildcard,$(APP_DIR)/fonts/$1/img/*))

$(call mkdirs, $(PKG_DIST_DIR) $(DIST_DIR)/fonts/$1)

all min: $(_fonts) $(_css)

$(BUILD_DIR)/tmp-css/$(APP_NAME).css: $(_css)

$(_fonts) $(_css): $(_deps) | $(DIST_DIR)/fonts/$1
	./create-icon-font -i $(APP_DIR)/fonts/$1/glyphs \
	                   -I $(APP_DIR)/fonts/$1/img \
	                   -n $1 \
	                   -c $(BUILD_DIR) -f $(DIST_DIR)/fonts/$1 -F ../fonts/$1
endef


$(call build-wildcards,*.slm,$(TMPL_DIR),$(SLM_BUILD_DIR),.slm,.html,NG2_SLM)
$(call build-tmpl,$(TMPL_FILES),templates.ts)
TMPL_DIR := $(SLM_BUILD_DIR)

$(call build-ts,$(TS_FILES),$(APP_NAME).js)
$(call build-vendor-js,$(VENDOR_JS_FILES),$(VENDOR_NAME).js)

$(call build-css,main.scss,$(APP_NAME).css)
$(call build-css,$(VENDOR_NAME).scss,$(VENDOR_NAME).css)

$(call copy-files,$(APP_DIR)/init.js,$(APP_DIR),$(BUILD_DIR)/js)
$(call copy-files,$(SLM_BUILD_DIR)/index.html,$(SLM_BUILD_DIR),$(DIST_DIR))
$(call copy-files,$(COPY_FILES),$(APP_DIR),$(DIST_DIR))

#$(call copy-wildcards,$(FONT_TYPES),\
                      $(RESOLVE_MATERIAL_DESIGN_ICONS_ICONFONT)/dist/fonts,\
                      $(DIST_DIR)/fonts/material-icons)

#$(call copy-wildcards,$(FONT_TYPES),\
                      $(RESOLVE_ROBOTO_FONTFACE)/fonts/roboto,\
                      $(DIST_DIR)/fonts/roboto)

#$(call copy-wildcards,$(FONT_TYPES),\
                      node_modules/font-awesome/fonts,\
                      $(DIST_DIR)/fonts/font-awesome)

$(call build,$(filter-out $(APP_DIR)/main.spec.ts,$(TS_TEST_FILES)),$(TS_TEST_LIST),CREATE_MODULE_LIST,,,test)
$(call build,$(TS_TEST_FILES) $(TS_TEST_LIST),$(BUILD_DIR)/test.js,TSC_TEST,,,test)


$(call main)

all min: | $(DIST_DIR)/$(APP_DIR)

all:
	$(call prefix,link,$(LN) ../$(BUILD_DIR)/js $(DIST_DIR)/js)
	$(call prefix,link,$(LN) ../$(BUILD_DIR)/css $(DIST_DIR)/css)

min:
	$(call prefix,link,$(LN) ../$(MIN_DIR)/js $(DIST_DIR)/js)
	$(call prefix,link,$(LN) ../$(MIN_DIR)/css $(DIST_DIR)/css)

$(DIST_DIR)/$(APP_DIR): | $(DIST_DIR)
	$(call prefix,mkdir,$(LN) ../$(APP_DIR) $@)

start: stop
	$(call prefix,server,$(SERVER_START))

stop:
	$(call prefix,server,$(SERVER_STOP))

watch:
	$(call prefix,build,-$(RESET_MAKE))
	$(call prefix,watch,$(call WATCH,$(WATCH_FILES),'$(RESET_MAKE)'))

min-watch:
	$(call prefix,build,-$(RESET_MAKE) min)
	$(call prefix,watch,$(call WATCH,$(WATCH_FILES),'$(RESET_MAKE) min'))

#pre-test: all

test:
	$(call prefix,test,karma start config/karma.conf.js --single-run)

test-watch:
	$(call prefix,test,karma start config/karma.conf.js)

test-e2e:
	$(call prefix,test,./e2e-test)
