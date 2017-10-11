import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy'})

export class GroupByPipe implements PipeTransform {
    transform(value: Array<any>, field: string): Array<any> {
        
        if (value) {
            const groupedObj = value.reduce((prev, cur) => {
                if(field.indexOf(".") >- 1){
                    var f = field.split(".");
                    
                    if (!prev[cur[f[0]][f[1]]]) {
                        prev[cur[f[0]][f[1]]] = [cur];
                    } else {
                        prev[cur[f[0]][f[1]]].push(cur);
                    }
                    return prev;
                }
                else{
                    if (!prev[cur[field]]) {
                        prev[cur[field]] = [cur];
                    } else {
                        prev[cur[field]].push(cur);
                    }
                    return prev;
                }
            }, {});
            return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
        }
        else return [];
    }
}