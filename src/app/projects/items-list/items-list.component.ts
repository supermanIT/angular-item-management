import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ItemsService} from './items.service';
import {AgGridComponent} from '../ag-grid/ag-grid.component';
import {ShowHideCheckboxComponent} from '../show-hide-checkbox/show-hide-checkbox.component';
import {EventEmitterService} from '@app/event-emitter.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../projects.service';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
    @ViewChild('agGridComponent', {static: true}) agGridComponent: AgGridComponent;
    @ViewChild('showHideCheckboxComponent', {static: true}) showHideCheckboxComponent: ShowHideCheckboxComponent;
    itemColumns = [];
    items;
    columnLoaded = false;
    fieldName = [];
    fieldType = [];
    showAllCheckBox = false;
    gridRows;  // gridApi;
    SelectedRowData = [];
    noOfSelectedRows = 0;
    notreffress = false;
    fields;
    fieldTypeWithNo = [];
    pageNo = 1;
    TotalItems;
    celldbclicked;
    oldArrow;
    fieldslable = [];
    sortOrder;
    headerField;
    totalPage;
    searchedValue: any;
    oldSearchId: string;
    RowIndex = [];
    agHeaderCheckbox = false;
    agheader: boolean;
    openedSearchedBoxId: any;
    CustomeHeaderField: any;
    @Input() itemSelectionView;

    private projectId;

    subscription: any;

    constructor(
        private itemsService: ItemsService,
        private router: Router,
        private route: ActivatedRoute,
        private projectService: ProjectsService,
        private eventEmitterService: EventEmitterService) {
        this.eventEmitterService.invokeOngetItemsByProjectWithPagination.subscribe((page: any) => {
            this.pageNo = page;
            this.countItemsByProject();
        });

    }

    // onLoadCustonHtml() {
    //     this.showHideCheckboxComponent.onCustomHtmlLoad();
    // }

    ngOnInit() {
        this.projectId = this.route.snapshot.params.id;
        localStorage.setItem('ProjectId', this.projectId);
        if (this.eventEmitterService.subsVar === undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.invokeItemListComponentFunction.subscribe((data: any) => {
                this.filterGridByApi(data);
            });
        }
        if (this.eventEmitterService.subsVar === undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.getLatetsItemEvents.subscribe((data: any) => {
                this.agGridComponent.getLatestitem(data);
            });
        }
        if (this.eventEmitterService.subsVar === undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.getItemsOfList.subscribe((data: any) => {
                this.ongetItemsByProjectWithPagination(this.pageNo);
            });
        }
        this.ongetItemsByProjectWithPagination(this.pageNo);
        this.countItemsByProject();
        this.GetFields();
        // this.autoGroupColumnDef = {};
        localStorage.setItem('pdata', 'true');
    }

    GetFields() {
        this.fields = [];
        this.itemColumns = [];
        this.fieldName = [];
        this.fieldType = [];
        this.projectService.getFieldsByProject(this.projectId).subscribe((fields: any) => {
            this.fields = fields;
            this.agGridComponent.setItemColumns(fields);
            this.columnLoaded = this.agGridComponent.columnLoaded;
            this.itemColumns = this.agGridComponent.itemColumns;
            this.itemColumns[0]['headerCheckboxSelection'] = true;
            this.itemColumns[0]['checkboxSelection'] = true;
            this.itemColumns[0]['rowDrag'] = true;
            for (let j = 1; j < this.itemColumns.length; j++) {
                this.itemColumns[j]['headerCheckboxSelection'] = false;
                this.itemColumns[j]['checkboxSelection'] = false;
                this.itemColumns[j]['rowDrag'] = false;
            }
        });
    }

    // getItems() {
    //     this.itemsService.countItemsByProject(localStorage.getItem('ProjectId')).subscribe((count: any) => {
    //         this.TotalItems = count;
    //         this.totalPage = Math.ceil(this.TotalItems / 100);
    //         if (this.totalPage === 1) {
    //             this.pageNo = 1;
    //         }
    //         this.ongetItemsByProjectWithPagination(this.pageNo);
    //     });
    // }

    countItemsByProject() {
        this.itemsService.countItemsByProject(localStorage.getItem('ProjectId')).subscribe((count: any) => {
            this.TotalItems = count;
            this.totalPage = Math.ceil(this.TotalItems / 100);
            if (this.pageNo > this.totalPage) {
                this.pageNo = this.totalPage;
            }
            if (this.totalPage === 1) {
                this.pageNo = 1;
            }
            this.ongetItemsByProjectWithPagination(this.pageNo);
        });
    }

    ongetItemsByProjectWithPagination(pageNo) {
        const data = {filter: [{techName: '', value: '', type: ''}], sort: {techName: '', direction: ''}};
        this.itemsService.ongetItemsByProjectWithPagination(localStorage.getItem('ProjectId'), data, pageNo).subscribe((items: any) => {
            this.items = items;
            // this.countPaginationValues();
        });
    }

    // onSingleItemSelect(event) {
    //     this.SelectedSingleRowData = event.data;
    // }

    // countPaginationValues() {
    //     this.itemFrom = this.ItemTO + 1;
    //     this.ItemTO = this.ItemTO + this.items.length;
    // }

    // sortGridbyApi(values) {
    //     let data;
    //
    //     data = {
    //         filter: [{techName: '', value: ''}],
    //         sort: {techName: values[0].colId, direction: values[0].sort}
    //     };
    //     this.itemsService.ongetItemsByProjectWithPagination(
    //         localStorage.getItem('ProjectId'), data, this.pageNo).subscribe((items: any) => {
    //         setTimeout(() => {
    //             this.items = items;
    //         }, 500);
    //         this.agHeaderCheckbox = false;
    //     });
    // }

    filterGridByApi(values) {
        let data = {
            filter: [{techName: values.techName, value: values.searchText, type: values.type}],
            sort: {techName: '', direction: ''}
        };
        if (values.searchText === '') {
            if (values.type === 'HAS_IMAGE' || values.type === 'NO_IMAGE') {
                data = {
                    filter: [{techName: '', value: '', type: values.type}],
                    sort: {techName: '', direction: ''}
                };
            } else {
                data = {
                    filter: [{techName: '', value: '', type: ''}],
                    sort: {techName: '', direction: ''}
                };
            }
        }
        if (localStorage.getItem('filterInputType') === 'date' && values.searchText) {
            const timeStamp = new Date(values.searchText);
            const newTimeStamp: number = timeStamp.getTime();
            data = {
                filter: [{techName: values.techName, value: newTimeStamp.toString(), type: values.type}],
                sort: {techName: '', direction: ''}
            };
        }

        this.itemsService.ongetItemsByProjectWithPagination(
            localStorage.getItem('ProjectId'), data, this.pageNo).subscribe((items: any) => {
            if (items.length > 0) {
                this.items = items;
            } else {
                this.items = [{_id: localStorage.getItem('ProjectId'), [values.techName]: 'No Data Found !!'}];
            }
        });
    }

    // cleanCheckboxes(e) {
    //     this.gridRows.forEach((row, i) => {
    //         row.setSelected(false);
    //     });
    // }
}
