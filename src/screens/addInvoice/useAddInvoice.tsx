import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { faker } from '@faker-js/faker';
import Toast from 'react-native-toast-message';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { createInvoice } from '@/slices';
import { useNavigation } from '@react-navigation/native';

const useAddInvoice = () => {
  const extenstions = [
    {
      addDeduct: 'ADD',
      value: 10,
      type: 'PERCENTAGE',
      name: 'tax',
    },
    {
      addDeduct: 'DEDUCT',
      type: 'FIXED_VALUE',
      value: 10.0,
      name: 'discount',
    },
  ];

  const items = [
    {
      uuid: faker.datatype.uuid(),
      itemReference: 'itemRef',
      description: 'Honda RC150',
      quantity: Math.floor(Math.random() * (10 - 1) + 1),
      rate: 1000,
      itemName: 'Honda Motor',
      itemUOM: 'KG',
      customFields: [
        {
          key: 'taxiationAndDiscounts_Name',
          value: 'VAT',
        },
      ],
      extensions: [
        {
          addDeduct: 'ADD',
          value: 10,
          type: 'FIXED_VALUE',
          name: 'tax',
        },
        {
          addDeduct: 'DEDUCT',
          value: 10,
          type: 'PERCENTAGE',
          name: 'tax',
        },
      ],
    },
    {
      uuid: faker.datatype.uuid(),
      itemReference: 'itemRef',
      description: 'Yamaha 155',
      quantity: Math.floor(Math.random() * (10 - 1) + 1),
      rate: 1000,
      itemName: 'Yamaha Motor',
      itemUOM: 'KG',
      customFields: [
        {
          key: 'taxiationAndDiscounts_Name',
          value: 'VAT',
        },
      ],
      extensions: [],
    },
  ];

  const itemExtenstions = [
    {
      addDeduct: 'ADD',
      value: 10,
      type: 'FIXED_VALUE',
      name: 'tax',
    },
    {
      addDeduct: 'DEDUCT',
      value: 10,
      type: 'PERCENTAGE',
      name: 'tax',
    },
  ];

  const [extenstionSelectedList, setExtenstionSelectedList] = useState([]);
  const [itemSelectedList, setItemSelectedList] = useState([]);
  const [dueDate, setDueDate] = useState(
    new Date(moment().endOf('year').toDate()),
  );

  const [isModalDateTime, setIsModalDatetime] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const { goBack } = useNavigation();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      sortCode: '10-01-02',
      bankAccountNumber: '12345678',
      bankAccountName: 'LeTanHai',
      customerFirstName: 'MaiMai',
      customerLastName: 'GG' + faker.internet.userName(),
      customerEmail: faker.internet.email(),
      customerMobileNumber: faker.phone.number(),
      currency: 'GBP',
      description: 'Invoice is issued to Akila Jayasinghe',
      premise: 'CT11',
      countryCode: 'VN',
      postcode: '1000',
      county: 'hoangmai',
      city: 'hanoi',
    },
  });

  const { watch } = methods;

  const onConfirmModalDatetime = useCallback(date => {
    setIsModalDatetime(false);
    setDueDate(date);
  }, []);

  const selectAddExtenstion = useCallback(
    (item: any) => {
      setExtenstionSelectedList(oldList =>
        oldList?.find(f => f?.type === item?.type)
          ? oldList
          : [item, ...oldList],
      );
    },
    [extenstionSelectedList],
  );

  const deleteExtenstionSelected = useCallback(
    (item: any) => {
      setExtenstionSelectedList(oldList =>
        oldList.filter(f => f?.type !== item?.type),
      );
    },
    [extenstionSelectedList],
  );

  const selectAddItem = useCallback(
    (item: any) => {
      setItemSelectedList(oldList => [item, ...oldList]);
    },
    [itemSelectedList],
  );

  const deleteItemSelected = useCallback(
    (item: any) => {
      setItemSelectedList(oldList =>
        oldList.filter(f => f?.uuid !== item?.uuid),
      );
    },
    [itemSelectedList],
  );

  const selectExtenstionItemSelected = useCallback(
    (itemSelected: any, itemExtention: any) => {
      setItemSelectedList(oldList =>
        oldList.map(item =>
          item?.uuid === itemSelected?.uuid
            ? {
                ...item,
                extensions: item?.extensions?.find(
                  f => f?.type === itemExtention?.type,
                )
                  ? item?.extensions
                  : [itemExtention, ...item?.extensions],
              }
            : item,
        ),
      );
    },
    [itemSelectedList],
  );

  const deleteExtenstionItemSelected = useCallback(
    (itemSelected: any, itemExtention: any) => {
      setItemSelectedList(oldList =>
        oldList.map(item =>
          item?.uuid === itemSelected?.uuid
            ? {
                ...item,
                extensions: item?.extensions?.filter(
                  f => f?.type !== itemExtention?.type,
                ),
              }
            : item,
        ),
      );
    },
    [itemSelectedList],
  );

  const addInvoice = async () => {
    try {
      const body = {
        invoices: [
          {
            bankAccount: {
              bankId: '',
              sortCode: watch('sortCode'),
              accountNumber: watch('bankAccountNumber'),
              accountName: watch('bankAccountName'),
            },
            customer: {
              firstName: watch('customerFirstName'),
              lastName: watch('customerLastName'),
              name:
                watch('customerFirstName') + ' ' + watch('customerLastName'),
              contact: {
                email: watch('customerEmail'),
                mobileNumber: watch('customerMobileNumber'),
              },
              addresses: [
                {
                  premise: watch('premise'),
                  countryCode: watch('countryCode'),
                  postcode: watch('postcode'),
                  county: watch('county'),
                  city: watch('city'),
                },
              ],
            },
            currency: watch('currency'),
            invoiceDate: moment().format('YYYY-MM-DD'),
            dueDate: moment(dueDate).format('YYYY-MM-DD'),
            description: 'HMin ' + faker.lorem.words(3),
            documents: [
              {
                documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
                documentName: 'Bill',
                documentUrl: 'http://url.com/#123',
              },
            ],
            items: itemSelectedList,
          },
        ],
      };

      const data = {
        tokens: {
          access_token: user?.access_token,
          org_token: user?.memberships[0].token,
        },
        body,
      };

      await dispatch(createInvoice(data)).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Add new invoice successfully',
          text2: 'New item will be displayed at the top of the list',
          position: 'bottom',
        });
        setTimeout(() => {
          goBack();
        }, 1000);
      });
    } catch (error) {
      console.log('🚀  addInvoice ~ error', error);
    }
  };

  return {
    methods,
    extenstionSelectedList,
    selectAddExtenstion,
    deleteExtenstionSelected,
    extenstions,
    items,
    itemExtenstions,
    selectAddItem,
    deleteItemSelected,
    itemSelectedList,
    deleteExtenstionItemSelected,
    selectExtenstionItemSelected,
    addInvoice,
    isModalDateTime,
    setIsModalDatetime,
    dueDate,
    onConfirmModalDatetime,
  };
};

export default useAddInvoice;
