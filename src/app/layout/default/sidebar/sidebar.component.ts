import {Component, OnInit, Signal} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MenuLinkComponent} from '../menu-link/menu-link.component';
import {PageStateService} from '../../../services/content/page-state.service';
import {LayoutService} from '../../../services/content/layout.service';
import {Observable, of} from 'rxjs';
import {ExternalLink, Link, Sidebar} from '../../../model';
import {LocaleService} from '../../../services/locale.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MenuLinkComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {

  readonly links: Signal<Link[]>;
  readonly group: Signal<string>;
  sidebar: Observable<Sidebar | undefined> = of(undefined);
  constructor(
    private readonly layoutService: LayoutService,
    private readonly localeService: LocaleService,
    pageStateService: PageStateService,
  ) {
    this.links = pageStateService.links;
    this.group = pageStateService.pageGroup;
  }

  ngOnInit(): void {
    this.localeService.changes.subscribe(() =>
      this.sidebar = this.layoutService.fetchSidebar()
    );
  }

  get frLanguageLink() {
    return this.localeService.getLocaleLink('fr');
  }

  get enLanguageLink() {
    return this.localeService.getLocaleLink('en');
  }

  logoTitle(link: ExternalLink): string {
    return `Logo ${link.title}`;
  }
}
