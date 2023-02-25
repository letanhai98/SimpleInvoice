import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useHome from './useHome';
import ItemInvoice from './components/ItemInvoice';
import { colors, stylesDefault, WIDTH_SCREEN } from '@/utils';
import { FormProvider } from 'react-hook-form';
import { EmptyList, FooterList, FormInput, PrimaryButton } from '@/components';
import { ModalStatus } from './components/ModalStatus';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { AddCircle } from 'iconsax-react-native';

const HomeScreen = ({ navigation }) => {
  const {
    invoiceList,
    methods,
    onSetStatus,
    onSetIsModalStatus,
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
    isModalStatus,
    onSetOpenModalDatetime,
    typeModalDatetime,
    onCancelModalDatetime,
    isModalDateTime,
    onConfirmModalDatetime,
  } = useHome();

  const renderItemInvoice = (data: { item: TInvoice; index: number }) => {
    const { item, index } = data;
    return <ItemInvoice key={item?.invoiceId} item={item} index={index} />;
  };

  const renderFilterAndSort = () => (
    <View
      style={{
        padding: 16,
      }}>
      <View style={styles.filter}>
        <Text style={styles.txtTileFilter}>Order by:</Text>
        <PrimaryButton
          title={orderByType}
          color={colors.txt_placeholder}
          containerStyle={styles.button}
          onPress={() => setOrderBy(prev => !prev)}
        />
      </View>
      <View style={styles.filter}>
        <Text style={styles.txtTileFilter}>Status:</Text>
        <PrimaryButton
          title={status?.name}
          color={colors.txt_placeholder}
          containerStyle={styles.button}
          onPress={onSetIsModalStatus}
        />
      </View>
      <View style={styles.filter}>
        <View style={[stylesDefault.rowAndCenter]}>
          <Text style={styles.txtTileFilter}>From: </Text>
          <PrimaryButton
            onPress={() => onSetOpenModalDatetime('fromDate')}
            title={moment(fromDate).format('YYYY-MM-DD')}
            color={colors.txt_placeholder}
            containerStyle={styles.button}
          />
        </View>
        <View style={[stylesDefault.rowAndCenter]}>
          <Text style={styles.txtTileFilter}>To: </Text>
          <PrimaryButton
            onPress={() => onSetOpenModalDatetime('toDate')}
            title={moment(toDate).format('YYYY-MM-DD')}
            color={colors.txt_placeholder}
            containerStyle={styles.button}
          />
        </View>
      </View>
    </View>
  );

  const renderSearch = () => (
    <View
      style={{
        paddingHorizontal: 16,
        marginTop: 16,
      }}>
      <FormProvider {...methods}>
        <FormInput
          key="keyword"
          name="keyword"
          placeholder="Search by invoice number"
        />
      </FormProvider>
    </View>
  );

  const renderButtonAdd = () => (
    <TouchableOpacity
      style={styles.btnAdd}
      onPress={() => navigation?.navigate('AddInvoice')}>
      <AddCircle size={80} color={colors.primary} variant="Bold" />
    </TouchableOpacity>
  );

  const renderInvoices = () => (
    <FlatList
      style={{ flex: 1, marginTop: 16, paddingHorizontal: 16 }}
      contentContainerStyle={[
        { flexGrow: 1 },
        invoiceList?.length === 0 && stylesDefault.center,
      ]}
      data={invoiceList}
      extraData={invoiceList}
      refreshing={false}
      onRefresh={onRefreshInvoice}
      keyExtractor={item => String(item?.invoiceId)}
      showsVerticalScrollIndicator={false}
      renderItem={renderItemInvoice}
      onEndReachedThreshold={0.4}
      initialNumToRender={10}
      windowSize={100}
      maxToRenderPerBatch={20}
      onEndReached={({ distanceFromEnd }) => {
        if (distanceFromEnd < 0) return;
        onLoadMoreInvoice();
      }}
      onMomentumScrollBegin={onMomentumScrollBegin}
      ListEmptyComponent={
        <EmptyList loading={loading} textEmpty={'No invoices'} />
      }
      ListFooterComponent={
        invoiceList?.length !== 0 && <FooterList loading={loading} />
      }
    />
  );

  return (
    <SafeAreaView style={styles?.container}>
      <View style={[stylesDefault.center]}>
        <Text style={styles.txtTitle}>Invoices</Text>
        {totalInvoicePage > 0 && (
          <Text style={styles.txtTileFilter}>
            ({pageNum}/{totalInvoicePage}) pages
          </Text>
        )}
      </View>
      {renderSearch()}
      {renderFilterAndSort()}
      {renderInvoices()}
      {renderButtonAdd()}

      <ModalStatus
        visible={isModalStatus}
        onSetStatus={onSetStatus}
        onRequestClose={onSetIsModalStatus}
      />

      <DatePicker
        modal
        open={isModalDateTime}
        date={typeModalDatetime === 'fromDate' ? fromDate : toDate}
        mode="date"
        onConfirm={onConfirmModalDatetime}
        onCancel={onCancelModalDatetime}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtTitle: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
  txtTileFilter: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
  },
  filter: {
    ...stylesDefault.rowAndCenter,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    width: WIDTH_SCREEN / 3.5,
    height: 38,
  },
  btnAdd: {
    position: 'absolute',
    bottom: 50,
    right: 24,
    width: 60,
    height: 60,
    ...stylesDefault.center,
  },
});

export default HomeScreen;
