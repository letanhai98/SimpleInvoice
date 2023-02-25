import React from 'react';
import { FormProvider } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useAddInvoice from './useAddInvoice';
import { FormButton, FormInput, PrimaryButton } from '@/components/index';
import colors from '@/utils/colors';
import { stylesDefault } from '@/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isAndroid } from '@/utils';
import SelectDropdown from 'react-native-select-dropdown';
import { ArrowLeft, CloseCircle } from 'iconsax-react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const AddInvoiceScreen = ({ navigation }) => {
  const {
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
  } = useAddInvoice();

  const renderTitleAndInput = ({ inputName, title, placeHolder }) => (
    <View
      style={[
        stylesDefault.rowAndCenter,
        {
          justifyContent: 'flex-end',
        },
      ]}>
      <Text style={styles.txtTitleInfo}>{title}: </Text>
      <View style={{ flex: 7 }}>
        <FormInput
          key={inputName}
          name={inputName}
          placeholder={placeHolder}
          styleContainer={styles.containerInput}
        />
      </View>
    </View>
  );

  const renderTitleAndView = ({ title, view, styleContainer = {} }) => (
    <View
      style={[
        stylesDefault.rowAndCenter,
        {
          justifyContent: 'flex-end',
        },
        styleContainer,
      ]}>
      <Text style={styles.txtTitleInfo}>{title}: </Text>
      <View style={{ flex: 7 }}>{view}</View>
    </View>
  );

  const renderForm = () => (
    <View
      style={{
        padding: 16,
      }}>
      <FormProvider {...methods}>
        <Text style={styles.txtTitle}>Bank Account: </Text>
        {renderTitleAndInput({
          title: 'Sort Code',
          inputName: 'sortCode',
          placeHolder: 'Sort Code',
        })}
        {renderTitleAndInput({
          title: 'Account Number',
          inputName: 'bankAccountNumber',
          placeHolder: 'Bank Account Number',
        })}
        {renderTitleAndInput({
          title: 'Account name',
          inputName: 'bankAccountName',
          placeHolder: 'Bank account name',
        })}
        <Text style={styles.txtTitle}>Customer Information: </Text>
        {renderTitleAndInput({
          title: 'Customer Frist Name',
          inputName: 'customerFirstName',
          placeHolder: 'Customer First Name',
        })}
        {renderTitleAndInput({
          title: 'Customer Last Name',
          inputName: 'customerLastName',
          placeHolder: 'Customer Last Name',
        })}
        {renderTitleAndInput({
          title: 'Customer Email',
          inputName: 'customerEmail',
          placeHolder: 'Customer Last Name',
        })}
        {renderTitleAndInput({
          title: 'Customer Mobile Number',
          inputName: 'customerMobileNumber',
          placeHolder: 'Customer Mobile Number',
        })}
        <Text style={styles.txtTitle}>Invoice Due Date: </Text>
        {renderTitleAndView({
          title: 'Due Date',
          view: (
            <View>
              <PrimaryButton
                title={moment(dueDate).format('YYYY-MM-DD')}
                onPress={() => setIsModalDatetime(true)}
                color={colors.primary}
              />
            </View>
          ),
        })}
        <Text style={styles.txtTitle}>Customer Address: </Text>
        {renderTitleAndInput({
          title: 'Premise',
          inputName: 'premise',
          placeHolder: 'Premise',
        })}
        {renderTitleAndInput({
          title: 'Country Code',
          inputName: 'countryCode',
          placeHolder: 'Country Code',
        })}
        {renderTitleAndInput({
          title: 'Post Code',
          inputName: 'postcode',
          placeHolder: 'Post Code',
        })}
        {renderTitleAndInput({
          title: 'County',
          inputName: 'county',
          placeHolder: 'County',
        })}
        {renderTitleAndInput({
          title: 'City',
          inputName: 'city',
          placeHolder: 'City',
        })}
        <Text style={styles.txtTitle}>Discount???: </Text>
        {renderTitleAndView({
          title: 'Extenstions',
          styleContainer: {
            marginTop: 8,
          },
          view: (
            <SelectDropdown
              data={extenstions}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                selectAddExtenstion(selectedItem);
              }}
              buttonTextStyle={{
                fontSize: 16,
              }}
              rowTextStyle={{
                fontSize: 14,
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return 'Click to select extenstion';
              }}
              buttonStyle={styles.btnSelect}
              defaultButtonText={'Click to select extenstion'}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return `Type: ${item?.type} - Value: ${item?.value} - Name: ${item?.name}`;
              }}
            />
          ),
        })}
        {extenstionSelectedList?.map((item, index) => {
          return (
            <View key={index} style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text
                style={[
                  {
                    textAlign: 'left',
                    fontSize: 14,
                    flex: 1,
                  },
                ]}>
                Type: {item?.type} - Value: {item?.value} - Name: {item?.name}
              </Text>
              <TouchableOpacity onPress={() => deleteExtenstionSelected(item)}>
                <CloseCircle size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
          );
        })}
        <Text style={styles.txtTitle}>Items: </Text>
        {/* render select item */}
        {renderTitleAndView({
          title: 'Select Item',
          styleContainer: {
            marginTop: 8,
          },
          view: (
            <SelectDropdown
              data={items}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                selectAddItem(selectedItem);
              }}
              buttonTextStyle={{
                fontSize: 16,
              }}
              rowTextStyle={{
                fontSize: 14,
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return 'Click to select item';
              }}
              buttonStyle={styles.btnSelect}
              defaultButtonText={'Click to select item'}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item?.itemName;
              }}
            />
          ),
        })}

        {/* render items selected */}
        {itemSelectedList?.map((item, index) => {
          const renderTitleAndValue = ({ title, value }) => (
            <View style={{ width: '100%', ...stylesDefault.rowAndCenter }}>
              <Text
                style={[
                  {
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 'bold',
                  },
                ]}>
                {title}:
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 14,
                  marginLeft: 8,
                  flex: 1,
                }}>
                {value}
              </Text>
            </View>
          );

          return (
            <View
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.black,
                padding: 8,
                marginTop: 8,
              }}>
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginTop: 8,
                  paddingRight: 16,
                }}>
                <View style={{ flex: 1 }}>
                  {renderTitleAndValue({
                    title: 'Name',
                    value: item?.itemName,
                  })}
                  {renderTitleAndValue({
                    title: 'Description',
                    value: item?.description,
                  })}
                  {renderTitleAndValue({
                    title: 'Quantity',
                    value: item?.quantity,
                  })}
                </View>
                <TouchableOpacity onPress={() => deleteItemSelected(item)}>
                  <CloseCircle size={20} color={colors.danger} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                }}>
                {/* render select extenstion of item */}
                {renderTitleAndView({
                  title: 'Extenstions',
                  view: (
                    <SelectDropdown
                      data={itemExtenstions}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        selectExtenstionItemSelected(item, selectedItem);
                      }}
                      buttonTextStyle={{
                        fontSize: 16,
                      }}
                      rowTextStyle={{
                        fontSize: 14,
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return 'Click to select extenstion';
                      }}
                      defaultButtonText={'Click to select extenstion'}
                      buttonStyle={styles.btnSelect}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return `Type: ${item?.type} - Value: ${item?.value} - Name: ${item?.name}`;
                      }}
                    />
                  ),
                })}

                {/* render extenstion of item */}
                <View style={{ flex: 1 }}>
                  {item?.extensions?.map((extenstion, indexExtenstion) => {
                    return (
                      <View
                        key={indexExtenstion}
                        style={{
                          flexDirection: 'row',
                          marginTop: 8,
                          paddingRight: 16,
                        }}>
                        <Text
                          style={[
                            {
                              textAlign: 'left',
                              fontSize: 14,
                              flex: 1,
                            },
                          ]}>
                          Type: {extenstion?.type} - Value: {extenstion?.value}{' '}
                          - Name: {extenstion?.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            deleteExtenstionItemSelected(item, extenstion)
                          }>
                          <CloseCircle size={20} color={colors.danger} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          );
        })}
        <FormButton
          title={'Add New Invoice'}
          onPress={addInvoice}
          preventDirty
          styleButtonContainer={{
            marginTop: 32,
          }}
        />
      </FormProvider>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: 'space-between',
          ...stylesDefault.rowAndCenter,
        }}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            width: 60,
            ...stylesDefault.center,
            marginBottom: -10,
          }}>
          <ArrowLeft color={colors.black} size={30} variant="Bold" />
        </TouchableOpacity>
        <Text
          style={[
            styles.txtTitle,
            {
              textAlign: 'center',
              marginTop: 16,
            },
          ]}>
          Add New Invoice
        </Text>
        <View style={{ width: 60 }} />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 8,
          paddingBottom: 100,
        }}
        enableOnAndroid={isAndroid}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {renderForm()}
      </KeyboardAwareScrollView>

      <DatePicker
        modal
        open={isModalDateTime}
        date={dueDate}
        mode="date"
        onConfirm={onConfirmModalDatetime}
        onCancel={() => setIsModalDatetime(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
  },
  txtTitleInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    flex: 3,
  },
  containerInput: {
    marginTop: 8,
  },
  btnSelect: {
    borderWidth: 1,
    borderColor: colors.black,
    height: 30,
  },
});

export default AddInvoiceScreen;
