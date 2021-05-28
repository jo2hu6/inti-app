import { Menu } from './../../../interfaces/menu';
import { MenuService } from './../../../services/menu.service';
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  menu: Menu[] = [];
  private _mobileQueryListener: () => void;

  fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);

  constructor(private _menuService: MenuService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu(){
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
    })
  }

}
