import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbButtonGroupModule, NbButtonModule, NbButtonToggleDirective, NbCardModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { SelectYearValue } from '../models/models';




@Component({
  selector: 'app-select-year',
  standalone: true,
  imports: [NbButtonModule, NbCardModule, NbLayoutModule, NbButtonGroupModule
    //  NbThemeModule.forRoot({ name: 'default' })

  ],
  templateUrl: './select-year.component.html',
  styleUrl: './select-year.component.css'
})
export class SelectYearComponent {
  @Input() year!: SelectYearValue
  @Output() select = new EventEmitter<SelectYearValue>()

  valueChange(value: SelectYearValue) {
    this.select.emit(value)
  }

}
