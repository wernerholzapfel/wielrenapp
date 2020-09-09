import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtappesPage } from './etappes-page.component';

describe('Tab1Page', () => {
  let component: EtappesPage;
  let fixture: ComponentFixture<EtappesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EtappesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtappesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
