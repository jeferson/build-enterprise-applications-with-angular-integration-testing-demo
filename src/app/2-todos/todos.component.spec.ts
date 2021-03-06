/* tslint:disable:no-unused-variable */
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not
// provided the TodoService as a dependency to TodosComponent.
//
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below.

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [TodosComponent],
      providers: [TodoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;

    // precisa ir lá para baixo, porque este método faz chamar o ngInit.
    // E, chamando o ngOnInit, não vai deixar alterar o comportamento com spyOn()
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the server', () => {
    // let service = TestBed.get(TodoService); // este vai pegar do nível do módulo.
    // fixture.debugElement.injector.get(TodoService); obtém uma dependência diretamente do componente

    let service = TestBed.get(TodoService);
    spyOn(service, 'getTodos').and.returnValue(Observable.from([ [1, 2, 3] ]));
    fixture.detectChanges();

    expect(component.todos.length).toBe(3);
  });

});
