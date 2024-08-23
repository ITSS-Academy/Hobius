export class CreateSearchDto {
  query: {
    query_string: {
      query: string;
    };
  };
}
