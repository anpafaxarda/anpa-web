import { Injectable, signal, computed } from '@angular/core';
import { fetchContacto } from '../../domain/contacto/contacto.action';
import { fetchGeneralData } from '../../domain/general-data/general-data.action';
import { GeneralData } from '../../domain/general-data/general-data.model';
import { fetchPageHeaders } from '../../domain/page-headers/page-headers.action';
import { PageHeaders } from '../../domain/page-headers/page-headers.model';

@Injectable({ providedIn: 'root' })
export class GlobalDataService {
  private _generalData = signal<GeneralData | null>(null);
  private _contacto = signal<any>(null);
  private _pageHeaders = signal<PageHeaders | null>(null);

  readonly generalData = computed(() => this._generalData() || {} as GeneralData);
  readonly contacto = computed(() => this._contacto() || { telefono: '', email: '' });
  readonly pageHeaders = computed(() => this._pageHeaders() ?? {} as Partial<PageHeaders>);

  async init() {
    try {
      const [genData, contData, headersData] = await Promise.all([
        fetchGeneralData(),
        fetchContacto(),
        fetchPageHeaders()
      ]);
      this._generalData.set(genData);
      this._contacto.set(contData);
      this._pageHeaders.set(headersData);
    } catch (error) {
      console.error('Error cargando datos globales de Sanity:', error);
    }
  }
}
