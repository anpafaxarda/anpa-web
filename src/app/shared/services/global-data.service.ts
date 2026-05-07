import { Injectable, signal, computed } from '@angular/core';
import { fetchContacto } from '../../domain/contacto/contacto.action';
import { fetchGeneralData } from '../../domain/general-data/general-data.action';
import { GeneralData } from '../../domain/general-data/general-data.model';

@Injectable({ providedIn: 'root' })
export class GlobalDataService {
  // Signals privados para manejar el estado
  private _generalData = signal<GeneralData | null>(null);
  private _contacto = signal<any>(null);

  // Exposición pública como readonly
  readonly generalData = computed(() => this._generalData() || {} as GeneralData);
  readonly contacto = computed(() => this._contacto() || { telefono: '', email: '' });

  // Método para cargar los datos (se llamará al iniciar la app)
  async init() {
    try {
      const [genData, contData] = await Promise.all([
        fetchGeneralData(),
        fetchContacto()
      ]);
      this._generalData.set(genData);
      this._contacto.set(contData);
    } catch (error) {
      console.error('Error cargando datos globales de Sanity:', error);
    }
  }
}
