import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeelnemerTableSummaryComponent } from './deelnemer-table-summary.component';

describe('DeelnemerTableSummaryComponent', () => {
  let component: DeelnemerTableSummaryComponent;
  let fixture: ComponentFixture<DeelnemerTableSummaryComponent>;

  beforeEach(waitForAsync(() => {
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
