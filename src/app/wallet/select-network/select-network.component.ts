import { Component, OnInit } from '@angular/core';
import {ProviderService} from "../../services/provider/provider.service";

@Component({
  selector: 'app-select-network',
  templateUrl: './select-network.component.html',
  styleUrls: ['./select-network.component.css']
})
export class SelectNetworkComponent implements OnInit {

  selectedNetwork: string;

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    // setInterval( () => console.log(this.selectedNetwork), 3000)
  }

  onNetworkSelect(network: string) {
    console.log(network);
    this.providerService.changeProvider(network);
  }
}
