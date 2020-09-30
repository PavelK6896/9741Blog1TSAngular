import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


// для оптимизации работы с модулем
@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule]
})
export class SharedModule {

}
