import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RennersPage } from './renners.page';

describe('RennersPage', () => {
  let component: RennersPage;
  let fixture: ComponentFixture<RennersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RennersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RennersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
