import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ANALYTICS_CONFIG } from '../../core/config/analytics.config';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  template: `
    @if (isVisible()) {
      <div class="fixed bottom-6 left-6 right-6 md:right-10 md:w-96 z-[100] bg-surface-900 text-white p-6 rounded-3xl shadow-2xl border border-white/10">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🍪</span>
            <h3 class="font-bold text-lg leading-none">Aviso de privacidad</h3>
          </div>
          <p class="text-surface-400 text-sm leading-relaxed">
            Utilizamos cookies para entender cómo navegas por la web del ANPA y mejorar tu experiencia.
            Puedes leer nuestra <a href="/politica-cookies" class="underline hover:text-primary-400">política de cookies</a>.
          </p>
          <div class="flex gap-3">
            <button (click)="accept()"
                    class="flex-1 bg-primary-500 hover:bg-primary-400 text-white font-bold py-2.5 rounded-xl transition-all active:scale-95">
              Aceptar todas
            </button>
            <button (click)="decline()"
                    class="flex-1 bg-surface-800 hover:bg-surface-700 text-surface-300 py-2.5 rounded-xl transition-all">
              Solo técnicas
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class CookieBannerComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isVisible = signal(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        this.isVisible.set(true);
      } else if (consent === 'accepted') {
        setTimeout(() => this.initGoogleAnalytics(), 1000);
      }
    }
  }

  accept() {
    localStorage.setItem('cookie-consent', 'accepted');
    this.isVisible.set(false);
    this.initGoogleAnalytics();
  }

  decline() {
    localStorage.setItem('cookie-consent', 'declined');
    this.isVisible.set(false);
  }

  private initGoogleAnalytics() {
    if (!isPlatformBrowser(this.platformId)) return;

    const id = ANALYTICS_CONFIG.id;

    if (!document.getElementById('google-analytics-script')) {
      const gScript = document.createElement('script');
      gScript.id = 'google-analytics-script';
      gScript.async = true;
      gScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(gScript);
    }

    const gtag = (window as any).gtag;

    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_ads_personalization': 'granted'
      });

      gtag('js', new Date());
      gtag('config', id, {
        page_path: window.location.pathname,
        send_page_view: true
      });

      console.log('📊 Google Analytics: Consentimiento actualizado y tracking enviado.');
    } else {
      console.error('❌ Error: gtag no encontrado. Revisa el index.html');
    }
  }
}
