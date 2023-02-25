import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { invoiceApi } from '@/apis';

export interface InvoiceState {
  invoiceList: TInvoice[];
  totalInvoicePage: number;
  loading: boolean;
}

const initialState: InvoiceState = {
  invoiceList: [],
  totalInvoicePage: 10,
  loading: false,
};

export const getInvoices = createAsyncThunk(
  'invoice/getInvoices',
  async (data: {
    access_token: string;
    org_token: string;
    pageSize: number;
    pageNum: number;
    ordering: string;
    status: string;
    keyword: string;
    fromDate: string;
    toDate: string;
  }) => {
    const response = await invoiceApi.getInvoices(data);

    return {
      ...response,
      data: response.data,
      totalInvoicePage: Math.ceil(
        response?.paging?.totalRecords / data.pageSize,
      ),
    };
  },
);

export const createInvoice = createAsyncThunk(
  'invoice/createInvoice',
  async (data: {
    tokens: {
      access_token: string;
      org_token: string;
    };
    body;
  }) => {
    const response = await invoiceApi.createInvoice(data.tokens, data.body);
    return response.data;
  },
);

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateInvoiceList: (state, action: PayloadAction<[]>) => {
      state.invoiceList = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getInvoices.fulfilled, (state, action) => {
      const invoiceListTemp = [...state.invoiceList, ...action.payload.data];
      const uniqueArr = [...new Set(invoiceListTemp)];
      state.invoiceList = uniqueArr;

      state.totalInvoicePage = action.payload.totalInvoicePage;
    }),
      builder.addCase(createInvoice.fulfilled, (state, action) => {
        const invoiceListTemp = [...action.payload, ...state.invoiceList];
        const uniqueArr = [...new Set(invoiceListTemp)];
        state.invoiceList = uniqueArr;
      }),
      builder.addMatcher(isPending(getInvoices), (state, action) => {
        state.loading = true;
      }),
      builder.addMatcher(isFulfilled(getInvoices), (state, action) => {
        state.loading = false;
      }),
      builder.addMatcher(isRejected(getInvoices), (state, action) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateInvoiceList } = invoiceSlice.actions;
