import { Component, OnInit } from '@angular/core';
import {NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from "@nebular/theme";


interface TreeNode<T> {
  data: T;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}


@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  columns = ['TOKEN', 'PRICE', 'MARKET CAP', '24H', 'BALANCE'];
  allColumns = [ ...this.columns ];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit(): void {
  }




  // customColumn = 'name';
  // defaultColumns = [ 'size', 'kind', 'items' ];
  // allColumns = [ ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;




  data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 }
    },
  ];

  // getShowOn(index: number) {
  //   const minWithForMultipleColumns = 400;
  //   const nextColumnStep = 100;
  //   return minWithForMultipleColumns + (nextColumnStep * index);
  // }



}
