import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  AnnotationLayerRenderedEvent,
  LinkTarget,
  NgxExtendedPdfViewerModule,
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
  PdfDocumentInfo,
} from 'ngx-extended-pdf-viewer';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-example-pdf-viewer',
  templateUrl: './example-pdf-viewer.component.html',
  styleUrls: ['./example-pdf-viewer.component.scss'],
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  providers: [NgxExtendedPdfViewerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePdfViewerComponent implements OnInit, OnDestroy {
  @Input('pdfSrc') pdfSrc = '';
  @Input('page') page = 1;
  @Input('pageLabel') pageLabel = '1';
  @Output() pageChange = new EventEmitter<number>();

  private pageChangeSubject = new Subject<number>();
  subscriptions: Subscription[] = [];

  public spreadMode: 'off' | 'even' | 'odd' = 'off';

  /** In most cases, you don't need the NgxExtendedPdfViewerService. It allows you
   *  to use the "find" api, to extract text and images from a PDF file,
   *  to print programmatically, and to show or hide layers by a method call.
   */
  constructor(private pdfService: NgxExtendedPdfViewerService) {
    /* More likely than not you don't need to tweak the pdfDefaultOptions.
                                                                                                                                                                   They are a collecton of less frequently used options.
                                                                                                                                                                   To illustrate how they're used, here are two example settings: */
    // pdfDefaultOptions.doubleTapZoomFactor = '150%'; // The default value is '200%'
    // pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
    // but most devices support much higher resolutions.
    // Increasing this setting allows your users to use higher zoom factors,
    // trading image quality for performance.
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    pdfDefaultOptions.ignoreDestinationZoom = true;
    pdfDefaultOptions.enableScripting = false;
    pdfDefaultOptions.externalLinkTarget = LinkTarget.BLANK;
    pdfDefaultOptions.doubleTapZoomFactor = '125%';
    pdfDefaultOptions.doubleTapResetsZoomOnSecondDoubleTap = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    console.log('ExamplePdfViewerComponent initialized');
    console.log(this.pdfSrc);

    this.subscriptions.push(
      this.pageChangeSubject
        .pipe(
          debounceTime(1000), // Adjust the debounce time as needed
        )
        .subscribe((page) => {
          this.pageChange.emit(page);
          console.log(`Debounced page change: ${page}`);
        }),
    );
  }

  public onAnnotationLayerRendered(event: AnnotationLayerRenderedEvent): void {
    const copyrightHint = event.source.div.querySelector('.freeTextAnnotation');
    if (copyrightHint && copyrightHint instanceof HTMLElement) {
      copyrightHint.style.left = '20%';
      const canvas = copyrightHint.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '75%';
        canvas.style.height = '75%';
        canvas.style.top = '20px';
        canvas.style.left = '10%';
      }
    }
  }

  public onPageRendered(): void {
    if (!this.pdfService.isRenderQueueEmpty()) {
      // try again later when the pages requested by the pdf.js core or the user have been rendered
      setTimeout(() => this.onPageRendered(), 100);
    }

    const pagesBefore = this.spreadMode === 'off' ? 2 : 2;
    const pagesAfter = this.spreadMode === 'off' ? 2 : 5;
    let startPage = Math.max(this.page - pagesBefore, 1);
    let endPage = Math.min(
      this.page + pagesAfter,
      this.pdfService.numberOfPages(),
    );
    console.log(endPage);

    const renderedPages = this.pdfService.currentlyRenderedPages();

    for (let page = startPage; page <= endPage; page++) {
      const pageIndex = page - 1;
      if (!this.pdfService.hasPageBeenRendered(pageIndex)) {
        this.pdfService.addPageToRenderQueue(pageIndex);
        break; // break because you can request only one page at a time
      }
    }
  }

  public onPageChanges(page: number): void {
    this.pageChangeSubject.next(page);
  }
}
