import { of, throwError } from 'rxjs';
// import * as XLSX from '@xlsx.min';
// import * as FileSaver from 'file-saver';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { LogService } from './log.service';

import * as jspdf from '@jspdf.min';
type AOA = any[][];

// import * as svg2pdf from 'svg2pdf';

/**
 *
## FileService
    Service para trabalhar com arquivos seja exportando ou importando-os.
    Extenções disponiveis :
    - Xlsx
    - ...


### Tabela de Array of Arrays para Xlsx

`Array<Array<any>>` neatly maps to a table with `ngFor`:

```html
<table class="sjs-table">
  <tr *ngFor="let row of data">
    <td *ngFor="let val of row">
      {{val}}
    </td>
  </tr>
</table>
```
```typscript

this.fileService.export.xlsx().subscrib
```

---------------------

<input type="file" (change)="onFileChange($event)" multiple="false" />
```
 **/

@Injectable({
    providedIn: 'root'
})
export class FileService {

    static readonly mimeTypesMap = {
        png: {
            type: 'image/png'
        },
        gif: {
            type: 'image/gif'
        },
        jpg: {
            type: 'image/jpg'
        },
        jpeg: {
            type: 'image/jpeg'
        },
        pdf: {
            type: 'application/pdf'
        },
        mp4: {
            type: 'video/mp4'
        },
        doc: {
            type: 'application/msword;charset=UTF-8'
        },
        docx: {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=UTF-8'
        },
        ppt: {
            type: 'application/vnd.ms-powerpoint;charset=UTF-8'
        },
        xlsx: {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        }
    };

    constructor(public log: LogService) { }

    public export = {
        xlsx: (data: any[], fileName: string) =>
            of(data).pipe(
                map((_data) => {
                    // const EXCEL_EXTENSION = '.xlsx';
                    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(_data);
                    // const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                    // const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                    // FileSaver.saveAs(
                    //     new Blob([buffer], FileService.mimeTypesMap.xlsx),
                    //     fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
                    // );

                    // this.log.INFO({
                    //     component: 'FileService', method: 'export.xlsx',
                    //     value: JSON.stringify({
                    //         file: `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`,
                    //         data: _data
                    //     })
                    // });

                    // return `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION} Gerado com Sucesso!`;
                return null;
                }),
                catchError((e) => {
                    this.log.SEVERE({ component: 'FileService', method: 'export.xlsx', value: JSON.stringify(data), error: e });
                    return throwError('Falha na solicitação de exportação, tente mais tarde !');
                })
            ),

        xlsxBySheet: (sheets: { data: any[], sheetName: string }[], fileName: string) =>
            of(sheets).pipe(
                map((_sheets) => {
                    // const EXCEL_EXTENSION = '.xlsx';
                    // const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
                    // _sheets.forEach((_sheet) => {
                    //     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(_sheet.data);
                    //     workbook.SheetNames.push(_sheet.sheetName.replace(/\s/g, '_').slice(0, 10));
                    //     workbook.Sheets[_sheet.sheetName.replace(/\s/g, '_').slice(0, 10)] = worksheet;
                    // });
                    // const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                    // FileSaver.saveAs(
                    //     new Blob([buffer], FileService.mimeTypesMap.xlsx),
                    //     fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
                    // );

                    // this.log.INFO({
                    //     component: 'FileService', method: 'export.xlsx',
                    //     value: JSON.stringify({
                    //         file: `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`,
                    //         data: _sheets
                    //     })
                    // });

                    // return `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION} Gerado com Sucesso!`;
                    return null;
                }),
                catchError((e) => {
                    this.log.SEVERE({ component: 'FileService', method: 'export.xlsx', value: JSON.stringify(sheets), error: e });
                    return throwError('Falha na solicitação de exportação, tente mais tarde !');
                })
            ),

        // docx: (data: any, fileName: string) =>
        //     of(data).pipe(
        //         switchMap((_data) => {
        //             // const documentCreator = new DocumentCreator();
        //             // const doc = documentCreator.create([...]);
        //             const doc = new Document();
        //             const paragraph = new Paragraph(_data.list);
        //             const dateText = new TextRun(JSON.stringify(_data)).tab().bold();
        //             paragraph.addRun(dateText);
        //             doc.addParagraph(paragraph);
        //             const packer = new Packer();
        //             return packer.toBlob(doc);
        //         }),
        //         map((b) => {
        //             const EXTENSION = '.docx';
        //             FileSaver.saveAs(b, `${fileName}_export_${new Date().getTime()}${EXTENSION}`);

        //             this.log.INFO({
        //                 component: 'FileService', method: 'export.docx', value: JSON.stringify({
        //                     file: `${fileName}_export_${new Date().getTime()}${EXTENSION}`
        //                     , data: b
        //                 })
        //             });
        //             return `${fileName}_export_${new Date().getTime()}${EXTENSION} Gerado com Sucesso!`;
        //         }),
        //         catchError((e) => {
        //             this.log.SEVERE({ component: 'FileService', method: 'export.docx', value: JSON.stringify(data), error: e });
        //             return 'Falha na solicitação de exportação, tente mais tarde !';
        //         })
        //     ),

        // docxByHTML: (html: any, fileName: string) =>
        //     of(html).pipe(
        //         map((_html) => {
        //             const data = '<svg xmlns="http://www.w3.org/2000/svg" ' +
        //                 'width=" 100%" height="100%">' +
        //                 '<foreignObject width="100%" height="100%">' +
        //                 _html.querySelector('div') +
        //                 '</foreignObject>' +
        //                 '</svg>';
        //             const svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });

        //             const _img = new Image();
        //             const doc = new Document();
        //             const paragraph = new Paragraph();
        //             const dateText = new TextRun(_html.innerText).tab().bold();
        //             paragraph.addRun(dateText);
        //             doc.addParagraph(paragraph);
        //             const packer = new Packer();
        //             // return packer.toBlob(doc);
        //             return svg;
        //         }),
        //         map((b) => {
        //             const EXTENSION = '.docx';
        //             FileSaver.saveAs(b, `${fileName}_export_${new Date().getTime()}${EXTENSION}`);

        //             this.log.INFO({
        //                 component: 'FileService', method: 'export.docx', value: JSON.stringify({
        //                     file: `${fileName}_export_${new Date().getTime()}${EXTENSION}`
        //                     , data: b
        //                 })
        //             });
        //             return `${fileName}_export_${new Date().getTime()}${EXTENSION} Gerado com Sucesso!`;
        //         }),
        //         catchError((e) => {
        //             this.log.SEVERE({ component: 'FileService', method: 'export.docx', value: JSON.stringify(html), error: e });
        //             return 'Falha na solicitação de exportação, tente mais tarde !';
        //         })
        //     ),

        pdfByHtml: (nativeElement, fileName: string) => {
            try {
                const pdf = new jspdf();

                pdf.fromHTML(
                    nativeElement.innerHTML, 30, 15,
                    { 'width': 150, 'elementHandlers': { '#editor': (element, renderer) => true } },
                    () => {
                        pdf.save(`${fileName}_export_${new Date().getTime()}.pdf`);
                    },
                    0
                );

                this.log.INFO({
                    component: 'FileService',
                    method: 'export.pdfByHtml',
                    value: `${fileName}_export_${new Date().getTime()}.pdf Gerado com Sucesso!`
                });

            } catch (e) {
                this.log.SEVERE({
                    component: 'FileService',
                    method: 'export.pdfByHtml',
                    value: JSON.stringify(nativeElement), error: e
                });
            }
        },
    };

    //     * read a workbook */
    //    const bstr: string = await file.readText(textModule.encoding.ISO_8859_1);
    //    const wb = XLSX.read(bstr, { type: "binary" });

    //    /* write a workbook */
    //    const wbout: string = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    //    await file.writeText(wbout, textModule.encoding.ISO_8859_1);

    public import = {
        xlsx: (evt: any) => {
            // try {
            //     const dt = new Date();

            //     /* wire up file reader */
            //     const target: DataTransfer = <DataTransfer>(evt.target);
            //     if (target.files.length !== 1) {
            //         this.log.SEVERE('Cannot use multiple files');
            //         return throwError('Cannot use multiple files');
            //     }
            //     let data;
            //     const reader: FileReader = new FileReader();
            //     reader.onload = (e: any) => {
            //         /* read workbook */
            //         const bstr: string = e.target.result;
            //         const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            //         /* grab first sheet */
            //         const wsname: string = wb.SheetNames[0];
            //         const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            //         /* save data */
            //         data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
            //     };
            //     reader.readAsBinaryString(target.files[0]);
            //     return of(data);
            // } catch (error) {
            //     this.log.SEVERE(error);
            //     return throwError(error);
            // }
        },
    };

    public urlToData(_url) {
        try {
            // const wb: XLSX.WorkBook = XLSX.read(_url, { type: 'binary' });

            // /* grab first sheet */
            // const wsname: string = wb.SheetNames[0];
            // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            // /* save data */
            // const data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
            // return data;
        } catch (e) {
            this.log.SEVERE({
                component: 'FileService',
                method: 'urlToData',
                value: JSON.stringify(_url), error: e
            });
        }
    }

}
