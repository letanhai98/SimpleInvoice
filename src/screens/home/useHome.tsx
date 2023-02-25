import { getInvoices, updateInvoiceList } from '@/slices';
import { AppDispatch, RootState } from '@/store';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const pageSize = 10;

const useHome = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [orderBy, setOrderBy] = useState(false); // false: ASCENDING - true: DESCENDING
  const [fromDate, setFormDate] = useState(new Date());

  const [toDate, setToDate] = useState(
    new Date(moment().endOf('week').toDate()),
  );
  const [status, setStatus] = useState({
    name: 'All',
    value: '',
  });
  const [isNoLoadmore, setIsNoLoadmore] = useState(true);

  const [isModalStatus, setIsModalStatus] = useState(false);
  const [isModalDateTime, setIsModalDatetime] = useState(false);
  const [typeModalDatetime, setTypeModalDatetime] = useState('fromDate');

  const { user } = useSelector((state: RootState) => state.user);
  const { invoiceList, totalInvoicePage, loading } = useSelector(
    (state: RootState) => state.invoice,
  );

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      keyword: '',
    },
  });

  const { watch } = methods;
  const dispatch = useDispatch<AppDispatch>();

  const fromDateSendServer = moment(fromDate).format('YYYY-MM-DD');
  const toDateSendServer = moment(toDate).format('YYYY-MM-DD');

  const orderByType = useMemo(() => {
    // false: ASCENDING - true: DESCENDING
    return orderBy ? 'DESCENDING' : 'ASCENDING';
  }, [orderBy]);

  const onSetStatus = useCallback((status: any) => {
    setIsModalStatus(false);
    setStatus(status);
  }, []);

  const onSetIsModalStatus = useCallback(() => {
    setIsModalStatus(!isModalStatus);
  }, [isModalStatus]);

  const onSetOpenModalDatetime = useCallback((type: string) => {
    setIsModalDatetime(true);
    setTypeModalDatetime(type);
  }, []);

  const onCancelModalDatetime = useCallback(() => {
    setIsModalDatetime(false);
  }, []);

  const onConfirmModalDatetime = useCallback(
    date => {
      setIsModalDatetime(false);
      if (typeModalDatetime === 'fromDate') setFormDate(date);
      else setToDate(date);
    },
    [typeModalDatetime],
  );

  const onMomentumScrollBegin = useCallback(() => {
    setIsNoLoadmore(false);
  }, []);

  const onRefreshInvoice = () => {
    dispatch(updateInvoiceList([]));

    dispatch(
      getInvoices({
        access_token: user?.access_token,
        pageNum: 1,
        pageSize,
        org_token: user?.memberships[0].token,
        ordering: orderByType,
        keyword: watch('keyword'),
        status: status?.value,
        fromDate: fromDateSendServer,
        toDate: toDateSendServer,
      }),
    ).then(res => {
      setPageNum(1);
    });
  };

  const onLoadMoreInvoice = () => {
    if (pageNum + 1 <= totalInvoicePage && !isNoLoadmore) {
      setIsNoLoadmore(true);
      const data = {
        access_token: user?.access_token,
        pageNum: pageNum + 1,
        pageSize,
        org_token: user?.memberships[0].token,
        ordering: orderByType,
        keyword: watch('keyword'),
        status: status?.value,
        fromDate: fromDateSendServer,
        toDate: toDateSendServer,
      };

      dispatch(getInvoices(data)).then(() => {
        setPageNum(pageNum + 1);
      });
    }
  };

  useEffect(() => {
    // note: we can use debouce func when search by keyword
    dispatch(updateInvoiceList([]));

    const data = {
      access_token: user?.access_token,
      pageNum: 1,
      pageSize: pageSize,
      org_token: user?.memberships[0].token,
      ordering: orderByType,
      keyword: watch('keyword'),
      status: status?.value,
      fromDate: fromDateSendServer,
      toDate: toDateSendServer,
    };

    setTimeout(() => {
      dispatch(getInvoices(data)).then(res => {
        setPageNum(1);
      });
    }, 500);
  }, [
    orderByType,
    user,
    watch('keyword'),
    status,
    fromDateSendServer,
    toDateSendServer,
  ]);

  return {
    invoiceList,
    methods,
    orderBy,
    status,
    fromDate,
    toDate,
    loading,
    onLoadMoreInvoice,
    onRefreshInvoice,
    onMomentumScrollBegin,
    pageNum,
    totalInvoicePage,
    setOrderBy,
    orderByType,
    setStatus,
    onSetStatus,
    onSetIsModalStatus,
    isModalStatus,
    onSetOpenModalDatetime,
    typeModalDatetime,
    onCancelModalDatetime,
    isModalDateTime,
    onConfirmModalDatetime,
  };
};

export default useHome;
