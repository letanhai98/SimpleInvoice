import instance from './instance';

export const invoiceApi = {
  getInvoices: (data?: {
    access_token: string;
    org_token: string;
    pageSize: number;
    pageNum: number;
    ordering: string;
    status: string;
    keyword: string;
    fromDate: string;
    toDate: string;
  }) =>
    instance
      .get(
        `/invoice-service/1.0.0/invoices?pageNum=${data?.pageNum}&pageSize=${data?.pageSize}&dateType=INVOICE_DATE&sortBy=CREATED_DATE&ordering=${data?.ordering}&status=${data?.status}&keyword=${data?.keyword}&fromDate=${data?.fromDate}&toDate=${data?.toDate}`,
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
            'org-token': data?.org_token,
          },
        },
      )
      .then(res => res.data),

  createInvoice: (
    tokens: {
      access_token: string;
      org_token: string;
    },
    body: any,
  ) =>
    instance
      .post(`/invoice-service/2.0.0/invoices`, body, {
        headers: {
          Authorization: `Bearer ${tokens?.access_token}`,
          'Operation-Mode': 'SYNC',
          'org-token': tokens?.org_token,
        },
      })
      .then(res => res.data),
};
