import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    constructor(private httpClient: HttpClient) {
    }

    // requestOptions = {
    //   headers: new Headers(this.headerDict)
    // };

    public getItemsByProject(projectId) {
        projectId = localStorage.getItem('ProjectId');
        return this.httpClient.get(
            `${environment.apiUrl}/item/project/${projectId}`
        );
    }

    public newItemByProject(projectId, data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.post<any>(`${environment.apiUrl}/item`, data, {
            headers
        });
    }

    public Paste(data, type) {
        data['projectId'] = localStorage.getItem('ProjectId');
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        if (localStorage.getItem('pastetype') === 'copy') {

            return this.httpClient.post<any>(`${environment.apiUrl}/item/duplicate`, data, {
                headers
            });
        }
        if (localStorage.getItem('pastetype') === 'cut') {
            return this.httpClient.put<any>(`${environment.apiUrl}/item/paste`, data, {
                headers
            });
        }
        // localStorage.removeItem('copydata')
    }

    public editMassItemByProject(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.put<any>(`${environment.apiUrl}/item/mass`, data, {
            headers
        });
    }

    public editItemByProject(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.put<any>(`${environment.apiUrl}/item`, data, {
            headers
        });
    }

    public uploadImage(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key === 'picture') {
                    for (const item of data[key]) {
                        formData.append(key, item);
                    }
                }
                formData.append(key, data[key]);
            }
        }
        return this.httpClient.put<any>(`${environment.apiUrl}/item/upload-image`, formData, {
            headers
        });
    }

    public editSingleItemByProject(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.put<any>(`${environment.apiUrl}/item/mass`, data, {
            headers
        });
    }

    public deleteItemsByid(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.post<any>(`${environment.apiUrl}/item/mass-delete`, data);
    }

    public deleteSingleItemByid(id) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.delete<any>(`${environment.apiUrl}/item/` + id, {
            headers
        });
    }

    public duplicateItems(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.post<any>(`${environment.apiUrl}/item/duplicate`, data, {
            headers
        });
    }

    public changeOrder(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.put<any>(`${environment.apiUrl}/item/change-order`, data, {
            headers
        });
    }

    public addComment(data, id) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.post<any>(`${environment.apiUrl}/item/add-comment`, data, {
            headers
        });
    }

    public updateComment(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.put<any>(`${environment.apiUrl}/item/update-comment`, data, {
            headers
        });
    }

    public deleteComment(data) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.post<any>(`${environment.apiUrl}/item/delete-comment`, data);
    }

    public onGetItemsByProjectWithPagination(projectId, data, pageNO) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.post<any>(`${environment.apiUrl}/item/project/` + projectId + '/pageNumber/' + pageNO + '/itemsPerPage/100', data);
    }

    public countItemsByProject(id) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return this.httpClient.get<any>(`${environment.apiUrl}/item/total/project/` + id);
    }

}
