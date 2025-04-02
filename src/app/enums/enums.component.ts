import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { setEnums } from '../../store/reducers/enums.reducer';

@Component({
  selector: 'app-enums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enums.component.html',
  styleUrl: './enums.component.scss'
})
export class EnumsComponent {
  private store = inject(Store); // Inject store
  enums$ = this.store.select(state => state.enums); 

  updateEnums() {
    this.store.dispatch(setEnums({ dbTypes: ['MySQL', 'PostgreSQL'], conflictResolveActions: ['Merge', 'Overwrite'] }));
  }
}
