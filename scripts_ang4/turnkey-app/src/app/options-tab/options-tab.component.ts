import { Input, Component, OnInit, ViewChild } from '@angular/core';
import { MdTabGroup } from '@angular/material';
import * as models from '../models/models';
import { FuncConfigService } from '../services/funcconfig.service';

@Component({
  selector: 'app-options-tab',
  templateUrl: './options-tab.component.html',
  styleUrls: ['./options-tab.component.css']
})
export class OptionsTabComponent implements OnInit {

  @ViewChild(MdTabGroup) mdTab: MdTabGroup;
  options: models.OptionsVO[];

  @Input() selectedIndex: number;

  get activeTab(): number {
    return this.mdTab.selectedIndex;
  }

  set activeTab(index: number) {
    this.mdTab.selectedIndex = index;
  }

  constructor(private _funcConfigService: FuncConfigService) { }

  ngOnInit() {
    this.options = this._funcConfigService.getOptions();

    if (this.options.length > 0) {
      this.activeTab = 0;
    }
  }

}
