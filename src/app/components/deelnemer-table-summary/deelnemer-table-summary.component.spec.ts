import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeelnemerTableSummaryComponent } from './deelnemer-table-summary.component';

describe('DeelnemerTableSummaryComponent', () => {
  let component: DeelnemerTableSummaryComponent;
  let fixture: ComponentFixture<DeelnemerTableSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeelnemerTableSummaryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeelnemerTableSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
