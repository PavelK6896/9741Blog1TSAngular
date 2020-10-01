import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from "ngx-quill";


// для оптимизации работы с модулем
@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot()], // QuillModule -- post html text
  exports: [HttpClientModule, QuillModule]
})
export class SharedModule {

}
