import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';
import { NgxsModule } from '@ngxs/store';

import { MainLayoutComponent } from './main-layout.component';
import { ColorState } from 'src/states/colors.state';

describe('MainLayoutComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ClarityModule,
				NgxsModule.forRoot([ColorState])
			],
			declarations: [
				MainLayoutComponent
			],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(MainLayoutComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'ng2-make-starter'`, () => {
		const fixture = TestBed.createComponent(MainLayoutComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('ng2-make-starter');
	});

	it('should render title in navbar', () => {
		const fixture = TestBed.createComponent(MainLayoutComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('.header-nav .title').textContent)
			.toBe('ng2-make-starter');
	});
});
