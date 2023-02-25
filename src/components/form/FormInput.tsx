import React, { RefObject } from 'react';
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import {
  Text,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '@/utils';
import { ErrorMessage } from '@hookform/error-message';

interface TextInputStyle extends ViewStyle {
  color?: string;
}

interface InputProps extends TextInputProps {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  styleContainer?: ViewStyle;
  styleViewInput?: ViewStyle;
  styleViewBottom?: ViewStyle;
  styleTextInput?: TextInputStyle;
  styleTextErr?: TextStyle;
  ref?: RefObject<TextInput>;
  viewInputChildren?: any;
  shadow?: boolean;
}

interface IProps<TFieldValues>
  extends Omit<InputProps, 'name'>,
    Pick<UseControllerProps, 'rules'> {
  name: Path<TFieldValues>;
}

export function FormInput<TFieldValues extends FieldValues = FieldValues>({
  styleContainer,
  styleViewBottom,
  styleViewInput,
  styleTextInput,
  styleTextErr,
  prefix,
  suffix,
  onChangeText,
  ref,
  viewInputChildren,
  shadow = true,
  ...props
}: IProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={props.name}
      control={control}
      rules={props.rules}
      render={({ field: { onChange, ...newField }, formState: { errors } }) => {
        return (
          <View style={styleContainer}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.bg_input,
                  borderRadius: 128,
                  paddingHorizontal: 20,
                },
                shadow && {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                },
                styleViewInput,
              ]}>
              <>
                {prefix && (
                  <>
                    <View style={{ width: 30 }}>{prefix}</View>
                  </>
                )}
                <TextInput
                  {...{ ...props, ...newField }}
                  ref={ref}
                  onChangeText={onChange}
                  placeholderTextColor={colors.txt_placeholder}
                  style={[
                    {
                      flex: 1,
                      height: 38,
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 16,
                    },
                    styleTextInput,
                  ]}
                />
                {suffix}
              </>
              {viewInputChildren}
            </View>

            <ErrorMessage
              errors={errors}
              name={props.name as any}
              render={({ message }) => (
                <Text
                  style={[
                    {
                      color: colors.danger,
                      fontSize: 12,
                      marginTop: 8,
                    },
                    styleTextErr,
                  ]}>
                  {message}
                </Text>
              )}
            />
          </View>
        );
      }}
    />
  );
}
