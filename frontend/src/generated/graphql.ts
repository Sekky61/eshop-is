import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Decimal: any;
  UUID: any;
};

export type AccountInfo = {
  __typename?: 'AccountInfo';
  email: Scalars['String'];
  id: Scalars['UUID'];
  role: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  id: Scalars['UUID'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
};

export type AddressFilterInput = {
  and?: InputMaybe<Array<AddressFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<AddressFilterInput>>;
  postalCode?: InputMaybe<StringOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  street?: InputMaybe<StringOperationFilterInput>;
};

export type AddressInput = {
  city: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
};

export type AddressSortInput = {
  city?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  postalCode?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  street?: InputMaybe<SortEnumType>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type AuthenticationStatus = {
  __typename?: 'AuthenticationStatus';
  isAuthenticated: Scalars['Boolean'];
  role: Scalars['String'];
};

export type BasketInfo = {
  __typename?: 'BasketInfo';
  basketItemCount: Scalars['Int'];
  customerId: Scalars['UUID'];
  items: Array<BasketItemInfo>;
};

export type BasketItemInfo = {
  __typename?: 'BasketItemInfo';
  id: Scalars['UUID'];
  merchandise: MerchandiseInfo;
  merchandiseId: Scalars['UUID'];
  quantity: Scalars['Int'];
};

export type CartManipInput = {
  merchandiseId: Scalars['UUID'];
  quantity: Scalars['Int'];
};

export type CategoryInputTypeInput = {
  name: Scalars['String'];
};

export type CategoryResult = {
  __typename?: 'CategoryResult';
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type CreditCard = {
  __typename?: 'CreditCard';
  cardHolderName: Scalars['String'];
  cardNumber: Scalars['String'];
  ccv: Scalars['String'];
  expirationDate: Scalars['String'];
  id: Scalars['UUID'];
};

export type CreditCardInput = {
  cardHolderName: Scalars['String'];
  cardNumber: Scalars['String'];
  ccv: Scalars['String'];
  expirationDate: Scalars['String'];
};

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  address?: Maybe<Address>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  orders: Array<OrderInfo>;
  paymentInformation?: Maybe<CreditCard>;
  phoneNumber: Scalars['String'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  neq?: InputMaybe<Scalars['Decimal']>;
  ngt?: InputMaybe<Scalars['Decimal']>;
  ngte?: InputMaybe<Scalars['Decimal']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  nlt?: InputMaybe<Scalars['Decimal']>;
  nlte?: InputMaybe<Scalars['Decimal']>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type MerchandiseConnection = {
  __typename?: 'MerchandiseConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MerchandiseEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<MerchandiseInfo>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type MerchandiseEdge = {
  __typename?: 'MerchandiseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: MerchandiseInfo;
};

export type MerchandiseEditResult = {
  __typename?: 'MerchandiseEditResult';
  id: Scalars['UUID'];
  imageUploadUrl: Scalars['String'];
  name: Scalars['String'];
  success: Scalars['Boolean'];
};

export type MerchandiseInfo = {
  __typename?: 'MerchandiseInfo';
  category: Scalars['String'];
  categoryId: Scalars['UUID'];
  categoryName: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['UUID'];
  imagesUrl: Array<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Decimal'];
  stock: Scalars['Int'];
};

export type MerchandiseInfoFilterInput = {
  and?: InputMaybe<Array<MerchandiseInfoFilterInput>>;
  categoryId?: InputMaybe<UuidOperationFilterInput>;
  categoryName?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<MerchandiseInfoFilterInput>>;
  price?: InputMaybe<DecimalOperationFilterInput>;
  stock?: InputMaybe<IntOperationFilterInput>;
};

export type MerchandiseInfoSortInput = {
  categoryId?: InputMaybe<SortEnumType>;
  categoryName?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  stock?: InputMaybe<SortEnumType>;
};

export type MerchandiseUpdateInput = {
  category?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  inStockCount?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Decimal']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  clearCart: Scalars['Boolean'];
  createCategory: CategoryResult;
  createMerchandise: MerchandiseEditResult;
  deleteAccount: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  deleteSelf: Scalars['Boolean'];
  login: SessionInfo;
  newSession: SessionInfo;
  orderBasket: Scalars['Boolean'];
  registerCustomer?: Maybe<SessionInfo>;
  registerManager?: Maybe<SessionInfo>;
  setCartItem: Scalars['Boolean'];
  updateCategory: CategoryResult;
  updateCustomer: UpdateCustomerPayload;
  updateMerchandise: MerchandiseEditResult;
  updateOrderStatus: Scalars['Boolean'];
};


export type MutationCreateCategoryArgs = {
  category: CategoryInputTypeInput;
};


export type MutationCreateMerchandiseArgs = {
  merchandise: NewMerchandiseInput;
};


export type MutationDeleteAccountArgs = {
  email: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['UUID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationOrderBasketArgs = {
  input: SendOrderInput;
};


export type MutationRegisterCustomerArgs = {
  input: RegisterCustomerInput;
};


export type MutationRegisterManagerArgs = {
  input: RegisterAccountInput;
};


export type MutationSetCartItemArgs = {
  input: CartManipInput;
};


export type MutationUpdateCategoryArgs = {
  category: CategoryInputTypeInput;
  id: Scalars['UUID'];
};


export type MutationUpdateCustomerArgs = {
  customerId: Scalars['UUID'];
  input: UpdateCustomerInput;
};


export type MutationUpdateMerchandiseArgs = {
  merchUpdate: MerchandiseUpdateInput;
};


export type MutationUpdateOrderStatusArgs = {
  orderId: Scalars['UUID'];
  status: Scalars['String'];
};

export type NewMerchandiseInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Decimal'];
};

export type OrderInfo = {
  __typename?: 'OrderInfo';
  address: Address;
  id: Scalars['UUID'];
  merchandises: Array<OrderItemInfo>;
  orderDate: Scalars['DateTime'];
  status: Scalars['String'];
  totalPrice: Scalars['Decimal'];
};

export type OrderInfoFilterInput = {
  address?: InputMaybe<AddressFilterInput>;
  and?: InputMaybe<Array<OrderInfoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<OrderInfoFilterInput>>;
  orderDate?: InputMaybe<DateTimeOperationFilterInput>;
  status?: InputMaybe<StringOperationFilterInput>;
  totalPrice?: InputMaybe<DecimalOperationFilterInput>;
};

export type OrderInfoSortInput = {
  address?: InputMaybe<AddressSortInput>;
  id?: InputMaybe<SortEnumType>;
  orderDate?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  totalPrice?: InputMaybe<SortEnumType>;
};

export type OrderItemInfo = {
  __typename?: 'OrderItemInfo';
  id: Scalars['UUID'];
  merchandise: MerchandiseInfo;
  merchandiseId: Scalars['UUID'];
  price: Scalars['Decimal'];
  quantity: Scalars['Int'];
};

/** A connection to a list of items. */
export type OrdersConnection = {
  __typename?: 'OrdersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrdersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<OrderInfo>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type OrdersEdge = {
  __typename?: 'OrdersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: OrderInfo;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  accountInfo?: Maybe<AccountInfo>;
  accounts: Array<AccountInfo>;
  authentication: AuthenticationStatus;
  basketInfo?: Maybe<BasketInfo>;
  categories: Array<CategoryResult>;
  categoryById?: Maybe<CategoryResult>;
  customerInfo?: Maybe<CustomerInfo>;
  customers: Array<CustomerInfo>;
  hello: Scalars['String'];
  merchandise?: Maybe<MerchandiseConnection>;
  merchandiseById?: Maybe<MerchandiseInfo>;
  orders?: Maybe<OrdersConnection>;
  ping: Scalars['String'];
};


export type QueryCategoryByIdArgs = {
  id: Scalars['UUID'];
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};


export type QueryMerchandiseArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<MerchandiseInfoSortInput>>;
  where?: InputMaybe<MerchandiseInfoFilterInput>;
};


export type QueryMerchandiseByIdArgs = {
  id: Scalars['UUID'];
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<OrderInfoSortInput>>;
  where?: InputMaybe<OrderInfoFilterInput>;
};

export type RegisterAccountInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterCustomerInput = {
  city: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
};

export type SendOrderInput = {
  address?: InputMaybe<AddressInput>;
  creditCard?: InputMaybe<CreditCardInput>;
};

export type SessionInfo = {
  __typename?: 'SessionInfo';
  token: Scalars['String'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerInput = {
  address?: InputMaybe<AddressInput>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  paymentInformation?: InputMaybe<CreditCardInput>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerPayload = {
  __typename?: 'UpdateCustomerPayload';
  customerInfo?: Maybe<CustomerInfo>;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']>;
  gt?: InputMaybe<Scalars['UUID']>;
  gte?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  lt?: InputMaybe<Scalars['UUID']>;
  lte?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
  ngt?: InputMaybe<Scalars['UUID']>;
  ngte?: InputMaybe<Scalars['UUID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  nlt?: InputMaybe<Scalars['UUID']>;
  nlte?: InputMaybe<Scalars['UUID']>;
};

export type ClearCartMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearCartMutation = { __typename?: 'Mutation', clearCart: boolean };

export type CreateMerchandiseMutationVariables = Exact<{
  input: NewMerchandiseInput;
}>;


export type CreateMerchandiseMutation = { __typename?: 'Mutation', createMerchandise: { __typename?: 'MerchandiseEditResult', success: boolean, name: string, imageUploadUrl: string } };

export type DeleteSelfMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteSelfMutation = { __typename?: 'Mutation', deleteSelf: boolean };

export type GetNewSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type GetNewSessionMutation = { __typename?: 'Mutation', newSession: { __typename?: 'SessionInfo', token: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'SessionInfo', token: string } };

export type OrderMutationVariables = Exact<{
  input: SendOrderInput;
}>;


export type OrderMutation = { __typename?: 'Mutation', orderBasket: boolean };

export type RegisterCustomerMutationVariables = Exact<{
  input: RegisterCustomerInput;
}>;


export type RegisterCustomerMutation = { __typename?: 'Mutation', registerCustomer?: { __typename?: 'SessionInfo', token: string } | null };

export type SetCartItemMutationVariables = Exact<{
  input: CartManipInput;
}>;


export type SetCartItemMutation = { __typename?: 'Mutation', setCartItem: boolean };

export type UpdateCustomerMutationVariables = Exact<{
  customerId: Scalars['UUID'];
  input: UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer: { __typename?: 'UpdateCustomerPayload', customerInfo?: { __typename?: 'CustomerInfo', id: any } | null } };

export type UpdateMerchandiseMutationVariables = Exact<{
  input: MerchandiseUpdateInput;
}>;


export type UpdateMerchandiseMutation = { __typename?: 'Mutation', updateMerchandise: { __typename?: 'MerchandiseEditResult', success: boolean, name: string, imageUploadUrl: string } };

export type UpdateOrderStatusMutationVariables = Exact<{
  orderId: Scalars['UUID'];
  status: Scalars['String'];
}>;


export type UpdateOrderStatusMutation = { __typename?: 'Mutation', updateOrderStatus: boolean };

export type GetAllOrdersQueryVariables = Exact<{
  filter?: InputMaybe<OrderInfoFilterInput>;
  count?: InputMaybe<Scalars['Int']>;
  afterCursor?: InputMaybe<Scalars['String']>;
}>;


export type GetAllOrdersQuery = { __typename?: 'Query', orders?: { __typename?: 'OrdersConnection', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null }, nodes?: Array<{ __typename?: 'OrderInfo', id: any, orderDate: any, status: string, totalPrice: any, address: { __typename?: 'Address', street: string, city: string, state: string, postalCode: string }, merchandises: Array<{ __typename?: 'OrderItemInfo', merchandiseId: any, quantity: number, price: any, merchandise: { __typename?: 'MerchandiseInfo', name: string } }> }> | null } | null };

export type GetBasketDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBasketDetailsQuery = { __typename?: 'Query', basketInfo?: { __typename?: 'BasketInfo', basketItemCount: number, items: Array<{ __typename?: 'BasketItemInfo', merchandiseId: any, quantity: number, merchandise: { __typename?: 'MerchandiseInfo', id: any, name: string, description: string, price: any, stock: number, categoryName: string, imagesUrl: Array<string> } }> } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryResult', id: any, name: string }> };

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'CustomerInfo', email: string }> };

export type GetMerchQueryVariables = Exact<{
  filter?: InputMaybe<MerchandiseInfoFilterInput>;
  count?: InputMaybe<Scalars['Int']>;
  afterCursor?: InputMaybe<Scalars['String']>;
}>;


export type GetMerchQuery = { __typename?: 'Query', merchandise?: { __typename?: 'MerchandiseConnection', nodes?: Array<{ __typename?: 'MerchandiseInfo', name: string, description: string, imagesUrl: Array<string>, price: any, stock: number, categoryName: string, id: any }> | null, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null } } | null };

export type GetMyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyInfoQuery = { __typename?: 'Query', authentication: { __typename?: 'AuthenticationStatus', isAuthenticated: boolean, role: string }, accountInfo?: { __typename?: 'AccountInfo', id: any, email: string, role: string } | null, customerInfo?: { __typename?: 'CustomerInfo', firstName: string, lastName: string, phoneNumber: string, address?: { __typename?: 'Address', city: string, street: string, state: string, postalCode: string } | null, paymentInformation?: { __typename?: 'CreditCard', cardNumber: string, ccv: string, expirationDate: string, cardHolderName: string } | null } | null, basketInfo?: { __typename?: 'BasketInfo', basketItemCount: number, items: Array<{ __typename?: 'BasketItemInfo', merchandiseId: any, quantity: number, merchandise: { __typename?: 'MerchandiseInfo', id: any, name: string, description: string, price: any, stock: number, categoryName: string, imagesUrl: Array<string> } }> } | null };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', customerInfo?: { __typename?: 'CustomerInfo', orders: Array<{ __typename?: 'OrderInfo', orderDate: any, status: string, totalPrice: any, id: any, address: { __typename?: 'Address', street: string, city: string, state: string, postalCode: string }, merchandises: Array<{ __typename?: 'OrderItemInfo', merchandiseId: any, quantity: number, price: any, merchandise: { __typename?: 'MerchandiseInfo', name: string, categoryName: string, description: string, price: any, stock: number } }> }> } | null };

export type ManagerGetOrdersQueryVariables = Exact<{
  filter?: InputMaybe<OrderInfoFilterInput>;
  count?: InputMaybe<Scalars['Int']>;
  afterCursor?: InputMaybe<Scalars['String']>;
}>;


export type ManagerGetOrdersQuery = { __typename?: 'Query', orders?: { __typename?: 'OrdersConnection', totalCount: number, nodes?: Array<{ __typename?: 'OrderInfo', status: string, merchandises: Array<{ __typename?: 'OrderItemInfo', merchandise: { __typename?: 'MerchandiseInfo', name: string } }> }> | null } | null };


export const ClearCartDocument = /*#__PURE__*/ gql`
    mutation ClearCart {
  clearCart
}
    `;
export type ClearCartMutationFn = Apollo.MutationFunction<ClearCartMutation, ClearCartMutationVariables>;

/**
 * __useClearCartMutation__
 *
 * To run a mutation, you first call `useClearCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCartMutation, { data, loading, error }] = useClearCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearCartMutation(baseOptions?: Apollo.MutationHookOptions<ClearCartMutation, ClearCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearCartMutation, ClearCartMutationVariables>(ClearCartDocument, options);
      }
export type ClearCartMutationHookResult = ReturnType<typeof useClearCartMutation>;
export type ClearCartMutationResult = Apollo.MutationResult<ClearCartMutation>;
export type ClearCartMutationOptions = Apollo.BaseMutationOptions<ClearCartMutation, ClearCartMutationVariables>;
export const CreateMerchandiseDocument = /*#__PURE__*/ gql`
    mutation CreateMerchandise($input: NewMerchandiseInput!) {
  createMerchandise(merchandise: $input) {
    success
    name
    imageUploadUrl
  }
}
    `;
export type CreateMerchandiseMutationFn = Apollo.MutationFunction<CreateMerchandiseMutation, CreateMerchandiseMutationVariables>;

/**
 * __useCreateMerchandiseMutation__
 *
 * To run a mutation, you first call `useCreateMerchandiseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMerchandiseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMerchandiseMutation, { data, loading, error }] = useCreateMerchandiseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMerchandiseMutation(baseOptions?: Apollo.MutationHookOptions<CreateMerchandiseMutation, CreateMerchandiseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMerchandiseMutation, CreateMerchandiseMutationVariables>(CreateMerchandiseDocument, options);
      }
export type CreateMerchandiseMutationHookResult = ReturnType<typeof useCreateMerchandiseMutation>;
export type CreateMerchandiseMutationResult = Apollo.MutationResult<CreateMerchandiseMutation>;
export type CreateMerchandiseMutationOptions = Apollo.BaseMutationOptions<CreateMerchandiseMutation, CreateMerchandiseMutationVariables>;
export const DeleteSelfDocument = /*#__PURE__*/ gql`
    mutation DeleteSelf {
  deleteSelf
}
    `;
export type DeleteSelfMutationFn = Apollo.MutationFunction<DeleteSelfMutation, DeleteSelfMutationVariables>;

/**
 * __useDeleteSelfMutation__
 *
 * To run a mutation, you first call `useDeleteSelfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSelfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSelfMutation, { data, loading, error }] = useDeleteSelfMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteSelfMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSelfMutation, DeleteSelfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSelfMutation, DeleteSelfMutationVariables>(DeleteSelfDocument, options);
      }
export type DeleteSelfMutationHookResult = ReturnType<typeof useDeleteSelfMutation>;
export type DeleteSelfMutationResult = Apollo.MutationResult<DeleteSelfMutation>;
export type DeleteSelfMutationOptions = Apollo.BaseMutationOptions<DeleteSelfMutation, DeleteSelfMutationVariables>;
export const GetNewSessionDocument = /*#__PURE__*/ gql`
    mutation GetNewSession {
  newSession {
    token
  }
}
    `;
export type GetNewSessionMutationFn = Apollo.MutationFunction<GetNewSessionMutation, GetNewSessionMutationVariables>;

/**
 * __useGetNewSessionMutation__
 *
 * To run a mutation, you first call `useGetNewSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetNewSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getNewSessionMutation, { data, loading, error }] = useGetNewSessionMutation({
 *   variables: {
 *   },
 * });
 */
export function useGetNewSessionMutation(baseOptions?: Apollo.MutationHookOptions<GetNewSessionMutation, GetNewSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetNewSessionMutation, GetNewSessionMutationVariables>(GetNewSessionDocument, options);
      }
export type GetNewSessionMutationHookResult = ReturnType<typeof useGetNewSessionMutation>;
export type GetNewSessionMutationResult = Apollo.MutationResult<GetNewSessionMutation>;
export type GetNewSessionMutationOptions = Apollo.BaseMutationOptions<GetNewSessionMutation, GetNewSessionMutationVariables>;
export const LoginDocument = /*#__PURE__*/ gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const OrderDocument = /*#__PURE__*/ gql`
    mutation Order($input: SendOrderInput!) {
  orderBasket(input: $input)
}
    `;
export type OrderMutationFn = Apollo.MutationFunction<OrderMutation, OrderMutationVariables>;

/**
 * __useOrderMutation__
 *
 * To run a mutation, you first call `useOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderMutation, { data, loading, error }] = useOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderMutation(baseOptions?: Apollo.MutationHookOptions<OrderMutation, OrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderMutation, OrderMutationVariables>(OrderDocument, options);
      }
export type OrderMutationHookResult = ReturnType<typeof useOrderMutation>;
export type OrderMutationResult = Apollo.MutationResult<OrderMutation>;
export type OrderMutationOptions = Apollo.BaseMutationOptions<OrderMutation, OrderMutationVariables>;
export const RegisterCustomerDocument = /*#__PURE__*/ gql`
    mutation RegisterCustomer($input: RegisterCustomerInput!) {
  registerCustomer(input: $input) {
    token
  }
}
    `;
export type RegisterCustomerMutationFn = Apollo.MutationFunction<RegisterCustomerMutation, RegisterCustomerMutationVariables>;

/**
 * __useRegisterCustomerMutation__
 *
 * To run a mutation, you first call `useRegisterCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerCustomerMutation, { data, loading, error }] = useRegisterCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterCustomerMutation(baseOptions?: Apollo.MutationHookOptions<RegisterCustomerMutation, RegisterCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterCustomerMutation, RegisterCustomerMutationVariables>(RegisterCustomerDocument, options);
      }
export type RegisterCustomerMutationHookResult = ReturnType<typeof useRegisterCustomerMutation>;
export type RegisterCustomerMutationResult = Apollo.MutationResult<RegisterCustomerMutation>;
export type RegisterCustomerMutationOptions = Apollo.BaseMutationOptions<RegisterCustomerMutation, RegisterCustomerMutationVariables>;
export const SetCartItemDocument = /*#__PURE__*/ gql`
    mutation SetCartItem($input: CartManipInput!) {
  setCartItem(input: $input)
}
    `;
export type SetCartItemMutationFn = Apollo.MutationFunction<SetCartItemMutation, SetCartItemMutationVariables>;

/**
 * __useSetCartItemMutation__
 *
 * To run a mutation, you first call `useSetCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCartItemMutation, { data, loading, error }] = useSetCartItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetCartItemMutation(baseOptions?: Apollo.MutationHookOptions<SetCartItemMutation, SetCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetCartItemMutation, SetCartItemMutationVariables>(SetCartItemDocument, options);
      }
export type SetCartItemMutationHookResult = ReturnType<typeof useSetCartItemMutation>;
export type SetCartItemMutationResult = Apollo.MutationResult<SetCartItemMutation>;
export type SetCartItemMutationOptions = Apollo.BaseMutationOptions<SetCartItemMutation, SetCartItemMutationVariables>;
export const UpdateCustomerDocument = /*#__PURE__*/ gql`
    mutation UpdateCustomer($customerId: UUID!, $input: UpdateCustomerInput!) {
  updateCustomer(customerId: $customerId, input: $input) {
    customerInfo {
      id
    }
  }
}
    `;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const UpdateMerchandiseDocument = /*#__PURE__*/ gql`
    mutation UpdateMerchandise($input: MerchandiseUpdateInput!) {
  updateMerchandise(merchUpdate: $input) {
    success
    name
    imageUploadUrl
  }
}
    `;
export type UpdateMerchandiseMutationFn = Apollo.MutationFunction<UpdateMerchandiseMutation, UpdateMerchandiseMutationVariables>;

/**
 * __useUpdateMerchandiseMutation__
 *
 * To run a mutation, you first call `useUpdateMerchandiseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMerchandiseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMerchandiseMutation, { data, loading, error }] = useUpdateMerchandiseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMerchandiseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMerchandiseMutation, UpdateMerchandiseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMerchandiseMutation, UpdateMerchandiseMutationVariables>(UpdateMerchandiseDocument, options);
      }
export type UpdateMerchandiseMutationHookResult = ReturnType<typeof useUpdateMerchandiseMutation>;
export type UpdateMerchandiseMutationResult = Apollo.MutationResult<UpdateMerchandiseMutation>;
export type UpdateMerchandiseMutationOptions = Apollo.BaseMutationOptions<UpdateMerchandiseMutation, UpdateMerchandiseMutationVariables>;
export const UpdateOrderStatusDocument = /*#__PURE__*/ gql`
    mutation UpdateOrderStatus($orderId: UUID!, $status: String!) {
  updateOrderStatus(orderId: $orderId, status: $status)
}
    `;
export type UpdateOrderStatusMutationFn = Apollo.MutationFunction<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;

/**
 * __useUpdateOrderStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderStatusMutation, { data, loading, error }] = useUpdateOrderStatusMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>(UpdateOrderStatusDocument, options);
      }
export type UpdateOrderStatusMutationHookResult = ReturnType<typeof useUpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationResult = Apollo.MutationResult<UpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationOptions = Apollo.BaseMutationOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;
export const GetAllOrdersDocument = /*#__PURE__*/ gql`
    query GetAllOrders($filter: OrderInfoFilterInput, $count: Int, $afterCursor: String) {
  orders(where: $filter, order: [{id: ASC}], first: $count, after: $afterCursor) {
    pageInfo {
      startCursor
      hasNextPage
      hasPreviousPage
      endCursor
    }
    nodes {
      id
      address {
        street
        city
        state
        postalCode
      }
      orderDate
      status
      totalPrice
      merchandises {
        merchandise {
          name
        }
        merchandiseId
        quantity
        price
      }
    }
  }
}
    `;

/**
 * __useGetAllOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      count: // value for 'count'
 *      afterCursor: // value for 'afterCursor'
 *   },
 * });
 */
export function useGetAllOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
      }
export function useGetAllOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export type GetAllOrdersQueryHookResult = ReturnType<typeof useGetAllOrdersQuery>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<typeof useGetAllOrdersLazyQuery>;
export type GetAllOrdersQueryResult = Apollo.QueryResult<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
export const GetBasketDetailsDocument = /*#__PURE__*/ gql`
    query GetBasketDetails {
  basketInfo {
    basketItemCount
    items {
      merchandiseId
      merchandise {
        id
        name
        description
        price
        stock
        categoryName
        imagesUrl
      }
      quantity
    }
  }
}
    `;

/**
 * __useGetBasketDetailsQuery__
 *
 * To run a query within a React component, call `useGetBasketDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBasketDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBasketDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBasketDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetBasketDetailsQuery, GetBasketDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBasketDetailsQuery, GetBasketDetailsQueryVariables>(GetBasketDetailsDocument, options);
      }
export function useGetBasketDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBasketDetailsQuery, GetBasketDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBasketDetailsQuery, GetBasketDetailsQueryVariables>(GetBasketDetailsDocument, options);
        }
export type GetBasketDetailsQueryHookResult = ReturnType<typeof useGetBasketDetailsQuery>;
export type GetBasketDetailsLazyQueryHookResult = ReturnType<typeof useGetBasketDetailsLazyQuery>;
export type GetBasketDetailsQueryResult = Apollo.QueryResult<GetBasketDetailsQuery, GetBasketDetailsQueryVariables>;
export const GetCategoriesDocument = /*#__PURE__*/ gql`
    query GetCategories {
  categories {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCustomersDocument = /*#__PURE__*/ gql`
    query GetCustomers {
  customers {
    email
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetMerchDocument = /*#__PURE__*/ gql`
    query GetMerch($filter: MerchandiseInfoFilterInput, $count: Int, $afterCursor: String) {
  merchandise(
    where: $filter
    order: [{name: ASC}]
    first: $count
    after: $afterCursor
  ) {
    nodes {
      name
      description
      imagesUrl
      price
      stock
      categoryName
      id
    }
    pageInfo {
      startCursor
      hasNextPage
      hasPreviousPage
      endCursor
    }
  }
}
    `;

/**
 * __useGetMerchQuery__
 *
 * To run a query within a React component, call `useGetMerchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMerchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMerchQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      count: // value for 'count'
 *      afterCursor: // value for 'afterCursor'
 *   },
 * });
 */
export function useGetMerchQuery(baseOptions?: Apollo.QueryHookOptions<GetMerchQuery, GetMerchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMerchQuery, GetMerchQueryVariables>(GetMerchDocument, options);
      }
export function useGetMerchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMerchQuery, GetMerchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMerchQuery, GetMerchQueryVariables>(GetMerchDocument, options);
        }
export type GetMerchQueryHookResult = ReturnType<typeof useGetMerchQuery>;
export type GetMerchLazyQueryHookResult = ReturnType<typeof useGetMerchLazyQuery>;
export type GetMerchQueryResult = Apollo.QueryResult<GetMerchQuery, GetMerchQueryVariables>;
export const GetMyInfoDocument = /*#__PURE__*/ gql`
    query GetMyInfo {
  authentication {
    isAuthenticated
    role
  }
  accountInfo {
    id
    email
    role
  }
  customerInfo {
    firstName
    lastName
    address {
      city
      street
      state
      postalCode
    }
    phoneNumber
    paymentInformation {
      cardNumber
      ccv
      expirationDate
      cardHolderName
    }
  }
  basketInfo {
    basketItemCount
    items {
      merchandiseId
      merchandise {
        id
        name
        description
        price
        stock
        categoryName
        imagesUrl
      }
      quantity
    }
  }
}
    `;

/**
 * __useGetMyInfoQuery__
 *
 * To run a query within a React component, call `useGetMyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetMyInfoQuery, GetMyInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyInfoQuery, GetMyInfoQueryVariables>(GetMyInfoDocument, options);
      }
export function useGetMyInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyInfoQuery, GetMyInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyInfoQuery, GetMyInfoQueryVariables>(GetMyInfoDocument, options);
        }
export type GetMyInfoQueryHookResult = ReturnType<typeof useGetMyInfoQuery>;
export type GetMyInfoLazyQueryHookResult = ReturnType<typeof useGetMyInfoLazyQuery>;
export type GetMyInfoQueryResult = Apollo.QueryResult<GetMyInfoQuery, GetMyInfoQueryVariables>;
export const GetOrdersDocument = /*#__PURE__*/ gql`
    query GetOrders {
  customerInfo {
    orders {
      orderDate
      status
      totalPrice
      id
      address {
        street
        city
        state
        postalCode
      }
      merchandises {
        merchandiseId
        quantity
        price
        merchandise {
          name
          categoryName
          description
          price
          stock
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const ManagerGetOrdersDocument = /*#__PURE__*/ gql`
    query ManagerGetOrders($filter: OrderInfoFilterInput, $count: Int, $afterCursor: String) {
  orders(
    where: $filter
    order: [{orderDate: ASC}]
    first: $count
    after: $afterCursor
  ) {
    totalCount
    nodes {
      status
      merchandises {
        merchandise {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useManagerGetOrdersQuery__
 *
 * To run a query within a React component, call `useManagerGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useManagerGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useManagerGetOrdersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      count: // value for 'count'
 *      afterCursor: // value for 'afterCursor'
 *   },
 * });
 */
export function useManagerGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<ManagerGetOrdersQuery, ManagerGetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ManagerGetOrdersQuery, ManagerGetOrdersQueryVariables>(ManagerGetOrdersDocument, options);
      }
export function useManagerGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ManagerGetOrdersQuery, ManagerGetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ManagerGetOrdersQuery, ManagerGetOrdersQueryVariables>(ManagerGetOrdersDocument, options);
        }
export type ManagerGetOrdersQueryHookResult = ReturnType<typeof useManagerGetOrdersQuery>;
export type ManagerGetOrdersLazyQueryHookResult = ReturnType<typeof useManagerGetOrdersLazyQuery>;
export type ManagerGetOrdersQueryResult = Apollo.QueryResult<ManagerGetOrdersQuery, ManagerGetOrdersQueryVariables>;