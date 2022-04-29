/* eslint-disable react/style-prop-object */
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import _values from 'lodash/values';
import { Screen } from '../types/Navigation';
import Container from '../components/Container';
import { Sizes } from '../constants/Sizes';
import Body from '../components/text/Body';

import { Creators as productsReducer, Types as productsActions } from '../store/duckers/products';
import useIsRequestLoading from '../hooks/useIsRequestLoading';
import { Colors } from '../constants/Colors';
import useAppSelector from '../hooks/useAppSelector';
import { Product } from '../types/Products';
import Touchable from '../components/button/Touchable';
import SearchInput from '../components/input/SearchInput';
import Title from '../components/text/Title';

const styles = StyleSheet.create({
  searchInput: {
    marginVertical: Sizes.GUTTER,
  },
  product: {
    paddingHorizontal: Sizes.GUTTER * 0.25,
    paddingVertical: Sizes.GUTTER,
  },
  productTitle: {
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: Sizes.GUTTER,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    opacity: 0.3,
  },
  emptyTitle: {
    marginVertical: Sizes.GUTTER * 2,
    textAlign: 'center',
  },
});

const Home: Screen<'Home'> = ({ navigation }) => {
  const listHash = useAppSelector<Record<number, Product>>(({ products }) => products.list);
  const list = useMemo(() => _values(listHash), [listHash]);
  const nextPage = useAppSelector<number | undefined>(({ products }) => products.nextPage);
  const isFetching = useIsRequestLoading(productsActions.FETCH_PRODUCTS);
  const isSearching = useIsRequestLoading(productsActions.SEARCH_PRODUCTS);

  const dispatch = useDispatch();

  const onEndReached = (): void => {
    if (isFetching || !nextPage) {
      return;
    }

    dispatch(productsReducer.fetchProducts());
  };

  useEffect(() => {
    dispatch(productsReducer.fetchProducts());
  }, []);

  const onProductPress = (id: number) => () => {
    navigation.navigate('ProductDetails', { productId: id });
  };

  const onSearch = (query: string): void => {
    dispatch(productsReducer.searchProducts(query));
  };

  const renderProduct: ListRenderItem<Product> = ({ item: product }) => (
    <Touchable style={styles.product} onPress={onProductPress(product.id)}>
      <Body style={styles.productTitle}>{product.title}</Body>
    </Touchable>
  );

  const renderLoading = (): React.ReactElement => <ActivityIndicator size="large" />;

  const renderEmptyList = (): React.ReactElement => <Title style={styles.emptyTitle}>No Product Found</Title>;

  return (
    <Container title="Product List">
      <SearchInput containerStyle={styles.searchInput} onSearch={onSearch} />
      <FlatList
        data={list}
        renderItem={renderProduct}
        ListEmptyComponent={renderEmptyList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
        ListHeaderComponent={isSearching ? renderLoading : undefined}
        ListFooterComponent={isFetching ? renderLoading : undefined}
      />
    </Container>
  );
};

export default Home;
