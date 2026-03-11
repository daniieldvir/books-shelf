import { BookDTO } from '../models/book.model';

export type BookForm = {
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  image: string;
  category: string;
  subtitle: string;
  language: string;
};

export function mapBookToForm(book: BookDTO | null): BookForm {
  return {
    title: book?.volumeInfo.title ?? '',
    author: book?.volumeInfo.authors?.[0] ?? '',
    publishedDate: book?.volumeInfo.publishedDate ?? '',
    description: book?.volumeInfo.description ?? '',
    image: book?.volumeInfo.imageLinks?.thumbnail ?? '',
    category: book?.volumeInfo.categories?.[0] ?? '',
    subtitle: book?.volumeInfo.subtitle ?? '',
    language: book?.volumeInfo.language ?? '',
  };
}

export function mapFormToUpdatedBook(current: BookDTO, form: BookForm): Partial<BookDTO> {
  return {
    ...current,
    volumeInfo: {
      ...current.volumeInfo,
      title: form.title,
      authors: [form.author],
      publishedDate: form.publishedDate,
      description: form.description,
      imageLinks: {
        ...current.volumeInfo.imageLinks,
        thumbnail: form.image,
      },
      categories: form.category ? [form.category] : current.volumeInfo.categories,
      subtitle: form.subtitle,
      language: form.language,
    },
  };
}
