import { Component, OnInit } from '@angular/core';
import {ProviderService} from "../../services/provider/provider.service";

@Component({
  selector: 'app-select-network',
  templateUrl: './select-network.component.html',
  styleUrls: ['./select-network.component.css']
})
export class SelectNetworkComponent implements OnInit {

  selectedNetwork: string = 'homestead';

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
  }

  onNetworkSelect(network: string) {
    this.providerService.changeProvider(network);
    console.log(this.selectedNetwork);
  }
}
