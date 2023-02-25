type TInvoice = {
    createdAt: string;
    createdBy: string;
    currency: string;
    currencySymbol: string;
    customer: {
        id: string;
        firstName: string;
        lastName: string;
        name: string;
        addresses: []
    };
    description: string;
    dueDate: string;
    extensions: [];
    invoiceDate: string;
    invoiceId: string;
    invoiceNumber: string;
    invoiceSubTotal: number;
    totalDiscount: number;
    totalTax: number;
    totalAmount: number;
    totalPaid: number;
    balanceAmount: number;
    numberOfDocuments: number;
    documents: [];
    items: [];
    merchant: {
        id: string;
        addresses: []
    };
    payments: [];
    referenceNo: number;
    invoiceReference: number;
    status: TInvoiceField[];
    subStatus: [];
    type: string;
    version: 1;
    invoiceGrossTotal: number;
    customFields: TInvoiceCustomField[]
}

type TInvoiceField = {
    key: string;
    value: boolean
}