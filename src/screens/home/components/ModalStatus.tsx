import { PrimaryButton } from '@/components';
import { colors, stylesDefault } from '@/utils';
import { CloseCircle } from 'iconsax-react-native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  onRequestClose?: () => void;
  onSetStatus: (data: any) => void;
}

const statusList = [
  {
    name: 'All',
    value: '',
  },
  {
    name: 'Paid',
    value: 'Paid',
  },
  {
    name: 'Due',
    value: 'Due',
  },
  {
    name: 'Overdue',
    value: 'Overdue',
  },
];

export const ModalStatus = ({
  visible,
  onRequestClose = () => {},
  onSetStatus = () => {},
}: Props) => {
  const [statusSelected, setStatusSelected] = useState(statusList[0]);

  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
      <View
        style={[
          stylesDefault.container,
          {
            backgroundColor: colors.backdropModal,
            padding: 16,
          },
        ]}>
        <View
          style={{
            width: '100%',
            borderRadius: 16,
            backgroundColor: colors.white,
            padding: 16,
            zIndex: 999,
          }}>
          <TouchableOpacity style={styles.btnClose} onPress={onRequestClose}>
            <CloseCircle color={colors.danger} variant="Bold" size={30} />
          </TouchableOpacity>
          <Text style={[styles.txtTitle]}>Select status</Text>
          {statusList?.map((item, index) => {
            const color =
              item?.value === statusSelected?.value
                ? colors.primary
                : colors.black;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setStatusSelected(item)}
                style={[
                  styles.itemStatus,
                  {
                    marginBottom: index === statusList?.length - 1 ? 16 : 0,
                  },
                ]}>
                <View
                  style={[
                    styles.circe1,
                    {
                      borderColor: color,
                    },
                  ]}>
                  {item?.value === statusSelected?.value && (
                    <View
                      style={[
                        styles.circe2,
                        {
                          backgroundColor: color,
                        },
                      ]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.txtStatus,
                    {
                      color,
                    },
                  ]}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
          <PrimaryButton
            title={'Select'}
            color={colors.primary}
            onPress={() => {
              onSetStatus(statusSelected);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  itemStatus: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStatus: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  txtTitle: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circe1: {
    width: 24,
    height: 24,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 2,
  },
  circe2: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
    backgroundColor: colors.primary,
  },
  btnClose: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
