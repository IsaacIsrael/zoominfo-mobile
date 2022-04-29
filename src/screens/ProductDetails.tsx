/* eslint-disable react/style-prop-object */
import React, { useMemo } from 'react';

import { Image, StyleSheet } from 'react-native';
import { Screen } from '../types/Navigation';
import Container from '../components/Container';
import { Sizes } from '../constants/Sizes';

import Body from '../components/text/Body';
import useAppSelector from '../hooks/useAppSelector';
import { Product } from '../types/Products';
import Title from '../components/text/Title';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
    marginTop: Sizes.GUTTER,
  },
  title: {
    textAlign: 'center',
    marginTop: Sizes.GUTTER * 2,
  },
  body: {
    marginTop: Sizes.GUTTER,
  },
});

const ProductDetails: Screen<'ProductDetails'> = ({ route }) => {
  const { productId } = route.params;
  const listHash = useAppSelector<Record<number, Product>>(({ products }) => products.list);
  const product = useMemo(() => listHash[productId], [listHash, productId]);

  return (
    <Container title="Product Detail">
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Title style={styles.title}>{product.title}</Title>
      <Body style={styles.body}>{product.description}</Body>
    </Container>
  );
};

export default ProductDetails;
