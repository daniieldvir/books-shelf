import { BookDTO } from '../models/book.model';
import { BookForm } from './book-form.mapper';
import { generateId } from './utils-functions.util';

export function mapFormToNewBook(form: BookForm): BookDTO {
  return {
    kind: '',
    id: generateId(),
    etag: '',
    selfLink: '',
    volumeInfo: {
      title: form.title,
      authors: [form.author],
      publisher: '',
      publishedDate: form.publishedDate,
      description: form.description,
      industryIdentifiers: [],
      readingModes: { text: false, image: false },
      pageCount: 0,
      printType: '',
      categories: form.category ? [form.category] : [],
      maturityRating: '',
      allowAnonLogging: false,
      contentVersion: '',
      imageLinks: {
        smallThumbnail: form.image,
        thumbnail: form.image,
      },
      language: form.language,
      previewLink: '',
      infoLink: '',
      canonicalVolumeLink: '',
      subtitle: form.subtitle,
    },
    saleInfo: {
      country: '',
      saleability: '',
      isEbook: false,
    },
    accessInfo: {
      country: '',
      viewability: '',
      embeddable: false,
      publicDomain: false,
      textToSpeechPermission: '',
      epub: { isAvailable: false },
      pdf: { isAvailable: false },
      webReaderLink: '',
      accessViewStatus: '',
      quoteSharingAllowed: false,
    },
    searchInfo: {
      textSnippet: '',
    },
  };
}
