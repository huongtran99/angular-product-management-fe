import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreaterComponent } from './product-creater.component';

describe('ProductCreaterComponent', () => {
  let component: ProductCreaterComponent;
  let fixture: ComponentFixture<ProductCreaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCreaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
