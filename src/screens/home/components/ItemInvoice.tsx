import { colors, SHADOW } from '@/utils';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  item: TInvoice;
  index?: number;
}

const ItemInvoice = ({ item, index }: Props) => {
  const renderDateAndType = () => (
    <View
      style={[
        styles.rowAndCenter,
        {
          justifyContent: 'space-between',
        },
      ]}>
      <Text style={styles.txtInfoMedium}>
        {moment(item?.createdAt).format('DD/MM/YYYY hh:mm:ss')}
      </Text>
      <Text
        style={[
          styles.txtInfoMedium,
          {
            fontWeight: 'bold',
          },
        ]}>
        {item?.type}
      </Text>
    </View>
  );

  const renderInfoCustomer = () => (
    <View>
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Invoice Number:</Text>
        <Text style={styles.txtInfo}>{item?.invoiceNumber}</Text>
      </View>
      {item?.referenceNo && (
        <View style={styles.rowAndCenter}>
          <Text style={styles.txtTite}>Reference No:</Text>
          <Text style={styles.txtInfo}>{item?.referenceNo}</Text>
        </View>
      )}
      {item?.invoiceReference && (
        <View style={styles.rowAndCenter}>
          <Text style={styles.txtTite}>Invoice Reference:</Text>
          <Text style={styles.txtInfo}>{item?.invoiceReference}</Text>
        </View>
      )}
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Due Date:</Text>
        <Text style={styles.txtInfo}>{item?.dueDate}</Text>
      </View>
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Invoice Date:</Text>
        <Text style={styles.txtInfo}>{item?.invoiceDate}</Text>
      </View>

      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Customer Name:</Text>
        <Text style={[styles.txtInfo]}>
          {item?.customer?.name ||
            item?.customer?.firstName + ' ' + item?.customer?.lastName}
        </Text>
      </View>
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Total Discount:</Text>
        <Text style={styles.txtInfo}>{item?.totalDiscount}</Text>
      </View>
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Total Tax:</Text>
        <Text style={styles.txtInfo}>{item?.totalTax}</Text>
      </View>
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Balance Amout:</Text>
        <Text style={styles.txtInfo}>{item?.balanceAmount}</Text>
      </View>
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Total Amount:</Text>
        <Text style={styles.txtInfo}>{item?.totalAmount}</Text>
      </View>
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Total Paid:</Text>
        <Text style={styles.txtInfo}>{item?.totalPaid}</Text>
      </View>
      {item?.description && (
        <View style={styles.rowAndCenter}>
          <Text style={styles.txtTite}>Description:</Text>
          <Text style={styles.txtInfo}>{item?.description}</Text>
        </View>
      )}
    </View>
  );

  const renderStatus = () => (
    <View>
      <View style={styles.rowAndCenter}>
        <Text style={styles.txtTite}>Status: </Text>
        <Text style={styles.txtInfo}>
          {item?.status?.map((itemStatus, indexStatus) => (
            <Text
              key={indexStatus}
              style={[
                styles.txtInfo,
                {
                  color: itemStatus?.value ? colors.primary : colors.warning,
                },
              ]}>
              {itemStatus?.key}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      key={item?.invoiceId + index}
      style={[
        styles.invoiceContainer,
        {
          marginTop: index > 0 ? 16 : 0,
        },
      ]}>
      {renderDateAndType()}
      {renderStatus()}
      {renderInfoCustomer()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  invoiceContainer: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.white,
    ...SHADOW,
  },
  txtTite: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 4.5,
  },
  txtInfo: {
    color: colors.primary,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
    flex: 5.5,
  },
  txtInfoMedium: {
    color: colors.black,
    fontSize: 12,
    marginBottom: 8,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ItemInvoice;
