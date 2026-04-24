
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ProductView
 * 
 */
export type ProductView = $Result.DefaultSelection<Prisma.$ProductViewPayload>
/**
 * Model ProductPurchase
 * 
 */
export type ProductPurchase = $Result.DefaultSelection<Prisma.$ProductPurchasePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more ProductViews
 * const productViews = await prisma.productView.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more ProductViews
   * const productViews = await prisma.productView.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.productView`: Exposes CRUD operations for the **ProductView** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductViews
    * const productViews = await prisma.productView.findMany()
    * ```
    */
  get productView(): Prisma.ProductViewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productPurchase`: Exposes CRUD operations for the **ProductPurchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductPurchases
    * const productPurchases = await prisma.productPurchase.findMany()
    * ```
    */
  get productPurchase(): Prisma.ProductPurchaseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ProductView: 'ProductView',
    ProductPurchase: 'ProductPurchase'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "productView" | "productPurchase"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ProductView: {
        payload: Prisma.$ProductViewPayload<ExtArgs>
        fields: Prisma.ProductViewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductViewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductViewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>
          }
          findFirst: {
            args: Prisma.ProductViewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductViewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>
          }
          findMany: {
            args: Prisma.ProductViewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>[]
          }
          create: {
            args: Prisma.ProductViewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>
          }
          createMany: {
            args: Prisma.ProductViewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductViewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>[]
          }
          delete: {
            args: Prisma.ProductViewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>
          }
          update: {
            args: Prisma.ProductViewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>
          }
          deleteMany: {
            args: Prisma.ProductViewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductViewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductViewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>[]
          }
          upsert: {
            args: Prisma.ProductViewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductViewPayload>
          }
          aggregate: {
            args: Prisma.ProductViewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductView>
          }
          groupBy: {
            args: Prisma.ProductViewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductViewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductViewCountArgs<ExtArgs>
            result: $Utils.Optional<ProductViewCountAggregateOutputType> | number
          }
        }
      }
      ProductPurchase: {
        payload: Prisma.$ProductPurchasePayload<ExtArgs>
        fields: Prisma.ProductPurchaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductPurchaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductPurchaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>
          }
          findFirst: {
            args: Prisma.ProductPurchaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductPurchaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>
          }
          findMany: {
            args: Prisma.ProductPurchaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>[]
          }
          create: {
            args: Prisma.ProductPurchaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>
          }
          createMany: {
            args: Prisma.ProductPurchaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductPurchaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>[]
          }
          delete: {
            args: Prisma.ProductPurchaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>
          }
          update: {
            args: Prisma.ProductPurchaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>
          }
          deleteMany: {
            args: Prisma.ProductPurchaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductPurchaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductPurchaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>[]
          }
          upsert: {
            args: Prisma.ProductPurchaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPurchasePayload>
          }
          aggregate: {
            args: Prisma.ProductPurchaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductPurchase>
          }
          groupBy: {
            args: Prisma.ProductPurchaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductPurchaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductPurchaseCountArgs<ExtArgs>
            result: $Utils.Optional<ProductPurchaseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    productView?: ProductViewOmit
    productPurchase?: ProductPurchaseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ProductView
   */

  export type AggregateProductView = {
    _count: ProductViewCountAggregateOutputType | null
    _min: ProductViewMinAggregateOutputType | null
    _max: ProductViewMaxAggregateOutputType | null
  }

  export type ProductViewMinAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    timestamp: Date | null
  }

  export type ProductViewMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    timestamp: Date | null
  }

  export type ProductViewCountAggregateOutputType = {
    id: number
    userId: number
    productId: number
    timestamp: number
    _all: number
  }


  export type ProductViewMinAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    timestamp?: true
  }

  export type ProductViewMaxAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    timestamp?: true
  }

  export type ProductViewCountAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    timestamp?: true
    _all?: true
  }

  export type ProductViewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductView to aggregate.
     */
    where?: ProductViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductViews to fetch.
     */
    orderBy?: ProductViewOrderByWithRelationInput | ProductViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductViews
    **/
    _count?: true | ProductViewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductViewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductViewMaxAggregateInputType
  }

  export type GetProductViewAggregateType<T extends ProductViewAggregateArgs> = {
        [P in keyof T & keyof AggregateProductView]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductView[P]>
      : GetScalarType<T[P], AggregateProductView[P]>
  }




  export type ProductViewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductViewWhereInput
    orderBy?: ProductViewOrderByWithAggregationInput | ProductViewOrderByWithAggregationInput[]
    by: ProductViewScalarFieldEnum[] | ProductViewScalarFieldEnum
    having?: ProductViewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductViewCountAggregateInputType | true
    _min?: ProductViewMinAggregateInputType
    _max?: ProductViewMaxAggregateInputType
  }

  export type ProductViewGroupByOutputType = {
    id: string
    userId: string
    productId: string
    timestamp: Date
    _count: ProductViewCountAggregateOutputType | null
    _min: ProductViewMinAggregateOutputType | null
    _max: ProductViewMaxAggregateOutputType | null
  }

  type GetProductViewGroupByPayload<T extends ProductViewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductViewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductViewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductViewGroupByOutputType[P]>
            : GetScalarType<T[P], ProductViewGroupByOutputType[P]>
        }
      >
    >


  export type ProductViewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["productView"]>

  export type ProductViewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["productView"]>

  export type ProductViewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["productView"]>

  export type ProductViewSelectScalar = {
    id?: boolean
    userId?: boolean
    productId?: boolean
    timestamp?: boolean
  }

  export type ProductViewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productId" | "timestamp", ExtArgs["result"]["productView"]>

  export type $ProductViewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductView"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      productId: string
      timestamp: Date
    }, ExtArgs["result"]["productView"]>
    composites: {}
  }

  type ProductViewGetPayload<S extends boolean | null | undefined | ProductViewDefaultArgs> = $Result.GetResult<Prisma.$ProductViewPayload, S>

  type ProductViewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductViewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductViewCountAggregateInputType | true
    }

  export interface ProductViewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductView'], meta: { name: 'ProductView' } }
    /**
     * Find zero or one ProductView that matches the filter.
     * @param {ProductViewFindUniqueArgs} args - Arguments to find a ProductView
     * @example
     * // Get one ProductView
     * const productView = await prisma.productView.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductViewFindUniqueArgs>(args: SelectSubset<T, ProductViewFindUniqueArgs<ExtArgs>>): Prisma__ProductViewClient<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductView that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductViewFindUniqueOrThrowArgs} args - Arguments to find a ProductView
     * @example
     * // Get one ProductView
     * const productView = await prisma.productView.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductViewFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductViewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductViewClient<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductView that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductViewFindFirstArgs} args - Arguments to find a ProductView
     * @example
     * // Get one ProductView
     * const productView = await prisma.productView.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductViewFindFirstArgs>(args?: SelectSubset<T, ProductViewFindFirstArgs<ExtArgs>>): Prisma__ProductViewClient<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductView that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductViewFindFirstOrThrowArgs} args - Arguments to find a ProductView
     * @example
     * // Get one ProductView
     * const productView = await prisma.productView.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductViewFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductViewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductViewClient<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductViews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductViewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductViews
     * const productViews = await prisma.productView.findMany()
     * 
     * // Get first 10 ProductViews
     * const productViews = await prisma.productView.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productViewWithIdOnly = await prisma.productView.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductViewFindManyArgs>(args?: SelectSubset<T, ProductViewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductView.
     * @param {ProductViewCreateArgs} args - Arguments to create a ProductView.
     * @example
     * // Create one ProductView
     * const ProductView = await prisma.productView.create({
     *   data: {
     *     // ... data to create a ProductView
     *   }
     * })
     * 
     */
    create<T extends ProductViewCreateArgs>(args: SelectSubset<T, ProductViewCreateArgs<ExtArgs>>): Prisma__ProductViewClient<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductViews.
     * @param {ProductViewCreateManyArgs} args - Arguments to create many ProductViews.
     * @example
     * // Create many ProductViews
     * const productView = await prisma.productView.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductViewCreateManyArgs>(args?: SelectSubset<T, ProductViewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductViews and returns the data saved in the database.
     * @param {ProductViewCreateManyAndReturnArgs} args - Arguments to create many ProductViews.
     * @example
     * // Create many ProductViews
     * const productView = await prisma.productView.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductViews and only return the `id`
     * const productViewWithIdOnly = await prisma.productView.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductViewCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductViewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductView.
     * @param {ProductViewDeleteArgs} args - Arguments to delete one ProductView.
     * @example
     * // Delete one ProductView
     * const ProductView = await prisma.productView.delete({
     *   where: {
     *     // ... filter to delete one ProductView
     *   }
     * })
     * 
     */
    delete<T extends ProductViewDeleteArgs>(args: SelectSubset<T, ProductViewDeleteArgs<ExtArgs>>): Prisma__ProductViewClient<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductView.
     * @param {ProductViewUpdateArgs} args - Arguments to update one ProductView.
     * @example
     * // Update one ProductView
     * const productView = await prisma.productView.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductViewUpdateArgs>(args: SelectSubset<T, ProductViewUpdateArgs<ExtArgs>>): Prisma__ProductViewClient<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductViews.
     * @param {ProductViewDeleteManyArgs} args - Arguments to filter ProductViews to delete.
     * @example
     * // Delete a few ProductViews
     * const { count } = await prisma.productView.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductViewDeleteManyArgs>(args?: SelectSubset<T, ProductViewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductViews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductViewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductViews
     * const productView = await prisma.productView.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductViewUpdateManyArgs>(args: SelectSubset<T, ProductViewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductViews and returns the data updated in the database.
     * @param {ProductViewUpdateManyAndReturnArgs} args - Arguments to update many ProductViews.
     * @example
     * // Update many ProductViews
     * const productView = await prisma.productView.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductViews and only return the `id`
     * const productViewWithIdOnly = await prisma.productView.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductViewUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductViewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductView.
     * @param {ProductViewUpsertArgs} args - Arguments to update or create a ProductView.
     * @example
     * // Update or create a ProductView
     * const productView = await prisma.productView.upsert({
     *   create: {
     *     // ... data to create a ProductView
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductView we want to update
     *   }
     * })
     */
    upsert<T extends ProductViewUpsertArgs>(args: SelectSubset<T, ProductViewUpsertArgs<ExtArgs>>): Prisma__ProductViewClient<$Result.GetResult<Prisma.$ProductViewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductViews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductViewCountArgs} args - Arguments to filter ProductViews to count.
     * @example
     * // Count the number of ProductViews
     * const count = await prisma.productView.count({
     *   where: {
     *     // ... the filter for the ProductViews we want to count
     *   }
     * })
    **/
    count<T extends ProductViewCountArgs>(
      args?: Subset<T, ProductViewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductViewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductView.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductViewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductViewAggregateArgs>(args: Subset<T, ProductViewAggregateArgs>): Prisma.PrismaPromise<GetProductViewAggregateType<T>>

    /**
     * Group by ProductView.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductViewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductViewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductViewGroupByArgs['orderBy'] }
        : { orderBy?: ProductViewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductViewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductViewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductView model
   */
  readonly fields: ProductViewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductView.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductViewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductView model
   */
  interface ProductViewFieldRefs {
    readonly id: FieldRef<"ProductView", 'String'>
    readonly userId: FieldRef<"ProductView", 'String'>
    readonly productId: FieldRef<"ProductView", 'String'>
    readonly timestamp: FieldRef<"ProductView", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductView findUnique
   */
  export type ProductViewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * Filter, which ProductView to fetch.
     */
    where: ProductViewWhereUniqueInput
  }

  /**
   * ProductView findUniqueOrThrow
   */
  export type ProductViewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * Filter, which ProductView to fetch.
     */
    where: ProductViewWhereUniqueInput
  }

  /**
   * ProductView findFirst
   */
  export type ProductViewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * Filter, which ProductView to fetch.
     */
    where?: ProductViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductViews to fetch.
     */
    orderBy?: ProductViewOrderByWithRelationInput | ProductViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductViews.
     */
    cursor?: ProductViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductViews.
     */
    distinct?: ProductViewScalarFieldEnum | ProductViewScalarFieldEnum[]
  }

  /**
   * ProductView findFirstOrThrow
   */
  export type ProductViewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * Filter, which ProductView to fetch.
     */
    where?: ProductViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductViews to fetch.
     */
    orderBy?: ProductViewOrderByWithRelationInput | ProductViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductViews.
     */
    cursor?: ProductViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductViews.
     */
    distinct?: ProductViewScalarFieldEnum | ProductViewScalarFieldEnum[]
  }

  /**
   * ProductView findMany
   */
  export type ProductViewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * Filter, which ProductViews to fetch.
     */
    where?: ProductViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductViews to fetch.
     */
    orderBy?: ProductViewOrderByWithRelationInput | ProductViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductViews.
     */
    cursor?: ProductViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductViews.
     */
    distinct?: ProductViewScalarFieldEnum | ProductViewScalarFieldEnum[]
  }

  /**
   * ProductView create
   */
  export type ProductViewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * The data needed to create a ProductView.
     */
    data: XOR<ProductViewCreateInput, ProductViewUncheckedCreateInput>
  }

  /**
   * ProductView createMany
   */
  export type ProductViewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductViews.
     */
    data: ProductViewCreateManyInput | ProductViewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductView createManyAndReturn
   */
  export type ProductViewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * The data used to create many ProductViews.
     */
    data: ProductViewCreateManyInput | ProductViewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductView update
   */
  export type ProductViewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * The data needed to update a ProductView.
     */
    data: XOR<ProductViewUpdateInput, ProductViewUncheckedUpdateInput>
    /**
     * Choose, which ProductView to update.
     */
    where: ProductViewWhereUniqueInput
  }

  /**
   * ProductView updateMany
   */
  export type ProductViewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductViews.
     */
    data: XOR<ProductViewUpdateManyMutationInput, ProductViewUncheckedUpdateManyInput>
    /**
     * Filter which ProductViews to update
     */
    where?: ProductViewWhereInput
    /**
     * Limit how many ProductViews to update.
     */
    limit?: number
  }

  /**
   * ProductView updateManyAndReturn
   */
  export type ProductViewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * The data used to update ProductViews.
     */
    data: XOR<ProductViewUpdateManyMutationInput, ProductViewUncheckedUpdateManyInput>
    /**
     * Filter which ProductViews to update
     */
    where?: ProductViewWhereInput
    /**
     * Limit how many ProductViews to update.
     */
    limit?: number
  }

  /**
   * ProductView upsert
   */
  export type ProductViewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * The filter to search for the ProductView to update in case it exists.
     */
    where: ProductViewWhereUniqueInput
    /**
     * In case the ProductView found by the `where` argument doesn't exist, create a new ProductView with this data.
     */
    create: XOR<ProductViewCreateInput, ProductViewUncheckedCreateInput>
    /**
     * In case the ProductView was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductViewUpdateInput, ProductViewUncheckedUpdateInput>
  }

  /**
   * ProductView delete
   */
  export type ProductViewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
    /**
     * Filter which ProductView to delete.
     */
    where: ProductViewWhereUniqueInput
  }

  /**
   * ProductView deleteMany
   */
  export type ProductViewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductViews to delete
     */
    where?: ProductViewWhereInput
    /**
     * Limit how many ProductViews to delete.
     */
    limit?: number
  }

  /**
   * ProductView without action
   */
  export type ProductViewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductView
     */
    select?: ProductViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductView
     */
    omit?: ProductViewOmit<ExtArgs> | null
  }


  /**
   * Model ProductPurchase
   */

  export type AggregateProductPurchase = {
    _count: ProductPurchaseCountAggregateOutputType | null
    _avg: ProductPurchaseAvgAggregateOutputType | null
    _sum: ProductPurchaseSumAggregateOutputType | null
    _min: ProductPurchaseMinAggregateOutputType | null
    _max: ProductPurchaseMaxAggregateOutputType | null
  }

  export type ProductPurchaseAvgAggregateOutputType = {
    price: number | null
    quantity: number | null
  }

  export type ProductPurchaseSumAggregateOutputType = {
    price: number | null
    quantity: number | null
  }

  export type ProductPurchaseMinAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    price: number | null
    quantity: number | null
    timestamp: Date | null
  }

  export type ProductPurchaseMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    price: number | null
    quantity: number | null
    timestamp: Date | null
  }

  export type ProductPurchaseCountAggregateOutputType = {
    id: number
    userId: number
    productId: number
    price: number
    quantity: number
    timestamp: number
    _all: number
  }


  export type ProductPurchaseAvgAggregateInputType = {
    price?: true
    quantity?: true
  }

  export type ProductPurchaseSumAggregateInputType = {
    price?: true
    quantity?: true
  }

  export type ProductPurchaseMinAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    price?: true
    quantity?: true
    timestamp?: true
  }

  export type ProductPurchaseMaxAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    price?: true
    quantity?: true
    timestamp?: true
  }

  export type ProductPurchaseCountAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    price?: true
    quantity?: true
    timestamp?: true
    _all?: true
  }

  export type ProductPurchaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductPurchase to aggregate.
     */
    where?: ProductPurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPurchases to fetch.
     */
    orderBy?: ProductPurchaseOrderByWithRelationInput | ProductPurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductPurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductPurchases
    **/
    _count?: true | ProductPurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductPurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductPurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductPurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductPurchaseMaxAggregateInputType
  }

  export type GetProductPurchaseAggregateType<T extends ProductPurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregateProductPurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductPurchase[P]>
      : GetScalarType<T[P], AggregateProductPurchase[P]>
  }




  export type ProductPurchaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductPurchaseWhereInput
    orderBy?: ProductPurchaseOrderByWithAggregationInput | ProductPurchaseOrderByWithAggregationInput[]
    by: ProductPurchaseScalarFieldEnum[] | ProductPurchaseScalarFieldEnum
    having?: ProductPurchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductPurchaseCountAggregateInputType | true
    _avg?: ProductPurchaseAvgAggregateInputType
    _sum?: ProductPurchaseSumAggregateInputType
    _min?: ProductPurchaseMinAggregateInputType
    _max?: ProductPurchaseMaxAggregateInputType
  }

  export type ProductPurchaseGroupByOutputType = {
    id: string
    userId: string
    productId: string
    price: number
    quantity: number
    timestamp: Date
    _count: ProductPurchaseCountAggregateOutputType | null
    _avg: ProductPurchaseAvgAggregateOutputType | null
    _sum: ProductPurchaseSumAggregateOutputType | null
    _min: ProductPurchaseMinAggregateOutputType | null
    _max: ProductPurchaseMaxAggregateOutputType | null
  }

  type GetProductPurchaseGroupByPayload<T extends ProductPurchaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductPurchaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductPurchaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductPurchaseGroupByOutputType[P]>
            : GetScalarType<T[P], ProductPurchaseGroupByOutputType[P]>
        }
      >
    >


  export type ProductPurchaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    price?: boolean
    quantity?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["productPurchase"]>

  export type ProductPurchaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    price?: boolean
    quantity?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["productPurchase"]>

  export type ProductPurchaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    price?: boolean
    quantity?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["productPurchase"]>

  export type ProductPurchaseSelectScalar = {
    id?: boolean
    userId?: boolean
    productId?: boolean
    price?: boolean
    quantity?: boolean
    timestamp?: boolean
  }

  export type ProductPurchaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productId" | "price" | "quantity" | "timestamp", ExtArgs["result"]["productPurchase"]>

  export type $ProductPurchasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductPurchase"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      productId: string
      price: number
      quantity: number
      timestamp: Date
    }, ExtArgs["result"]["productPurchase"]>
    composites: {}
  }

  type ProductPurchaseGetPayload<S extends boolean | null | undefined | ProductPurchaseDefaultArgs> = $Result.GetResult<Prisma.$ProductPurchasePayload, S>

  type ProductPurchaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductPurchaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductPurchaseCountAggregateInputType | true
    }

  export interface ProductPurchaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductPurchase'], meta: { name: 'ProductPurchase' } }
    /**
     * Find zero or one ProductPurchase that matches the filter.
     * @param {ProductPurchaseFindUniqueArgs} args - Arguments to find a ProductPurchase
     * @example
     * // Get one ProductPurchase
     * const productPurchase = await prisma.productPurchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductPurchaseFindUniqueArgs>(args: SelectSubset<T, ProductPurchaseFindUniqueArgs<ExtArgs>>): Prisma__ProductPurchaseClient<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductPurchase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductPurchaseFindUniqueOrThrowArgs} args - Arguments to find a ProductPurchase
     * @example
     * // Get one ProductPurchase
     * const productPurchase = await prisma.productPurchase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductPurchaseFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductPurchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductPurchaseClient<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductPurchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPurchaseFindFirstArgs} args - Arguments to find a ProductPurchase
     * @example
     * // Get one ProductPurchase
     * const productPurchase = await prisma.productPurchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductPurchaseFindFirstArgs>(args?: SelectSubset<T, ProductPurchaseFindFirstArgs<ExtArgs>>): Prisma__ProductPurchaseClient<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductPurchase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPurchaseFindFirstOrThrowArgs} args - Arguments to find a ProductPurchase
     * @example
     * // Get one ProductPurchase
     * const productPurchase = await prisma.productPurchase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductPurchaseFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductPurchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductPurchaseClient<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductPurchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPurchaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductPurchases
     * const productPurchases = await prisma.productPurchase.findMany()
     * 
     * // Get first 10 ProductPurchases
     * const productPurchases = await prisma.productPurchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productPurchaseWithIdOnly = await prisma.productPurchase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductPurchaseFindManyArgs>(args?: SelectSubset<T, ProductPurchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductPurchase.
     * @param {ProductPurchaseCreateArgs} args - Arguments to create a ProductPurchase.
     * @example
     * // Create one ProductPurchase
     * const ProductPurchase = await prisma.productPurchase.create({
     *   data: {
     *     // ... data to create a ProductPurchase
     *   }
     * })
     * 
     */
    create<T extends ProductPurchaseCreateArgs>(args: SelectSubset<T, ProductPurchaseCreateArgs<ExtArgs>>): Prisma__ProductPurchaseClient<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductPurchases.
     * @param {ProductPurchaseCreateManyArgs} args - Arguments to create many ProductPurchases.
     * @example
     * // Create many ProductPurchases
     * const productPurchase = await prisma.productPurchase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductPurchaseCreateManyArgs>(args?: SelectSubset<T, ProductPurchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductPurchases and returns the data saved in the database.
     * @param {ProductPurchaseCreateManyAndReturnArgs} args - Arguments to create many ProductPurchases.
     * @example
     * // Create many ProductPurchases
     * const productPurchase = await prisma.productPurchase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductPurchases and only return the `id`
     * const productPurchaseWithIdOnly = await prisma.productPurchase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductPurchaseCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductPurchaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductPurchase.
     * @param {ProductPurchaseDeleteArgs} args - Arguments to delete one ProductPurchase.
     * @example
     * // Delete one ProductPurchase
     * const ProductPurchase = await prisma.productPurchase.delete({
     *   where: {
     *     // ... filter to delete one ProductPurchase
     *   }
     * })
     * 
     */
    delete<T extends ProductPurchaseDeleteArgs>(args: SelectSubset<T, ProductPurchaseDeleteArgs<ExtArgs>>): Prisma__ProductPurchaseClient<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductPurchase.
     * @param {ProductPurchaseUpdateArgs} args - Arguments to update one ProductPurchase.
     * @example
     * // Update one ProductPurchase
     * const productPurchase = await prisma.productPurchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductPurchaseUpdateArgs>(args: SelectSubset<T, ProductPurchaseUpdateArgs<ExtArgs>>): Prisma__ProductPurchaseClient<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductPurchases.
     * @param {ProductPurchaseDeleteManyArgs} args - Arguments to filter ProductPurchases to delete.
     * @example
     * // Delete a few ProductPurchases
     * const { count } = await prisma.productPurchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductPurchaseDeleteManyArgs>(args?: SelectSubset<T, ProductPurchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductPurchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPurchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductPurchases
     * const productPurchase = await prisma.productPurchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductPurchaseUpdateManyArgs>(args: SelectSubset<T, ProductPurchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductPurchases and returns the data updated in the database.
     * @param {ProductPurchaseUpdateManyAndReturnArgs} args - Arguments to update many ProductPurchases.
     * @example
     * // Update many ProductPurchases
     * const productPurchase = await prisma.productPurchase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductPurchases and only return the `id`
     * const productPurchaseWithIdOnly = await prisma.productPurchase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductPurchaseUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductPurchaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductPurchase.
     * @param {ProductPurchaseUpsertArgs} args - Arguments to update or create a ProductPurchase.
     * @example
     * // Update or create a ProductPurchase
     * const productPurchase = await prisma.productPurchase.upsert({
     *   create: {
     *     // ... data to create a ProductPurchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductPurchase we want to update
     *   }
     * })
     */
    upsert<T extends ProductPurchaseUpsertArgs>(args: SelectSubset<T, ProductPurchaseUpsertArgs<ExtArgs>>): Prisma__ProductPurchaseClient<$Result.GetResult<Prisma.$ProductPurchasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductPurchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPurchaseCountArgs} args - Arguments to filter ProductPurchases to count.
     * @example
     * // Count the number of ProductPurchases
     * const count = await prisma.productPurchase.count({
     *   where: {
     *     // ... the filter for the ProductPurchases we want to count
     *   }
     * })
    **/
    count<T extends ProductPurchaseCountArgs>(
      args?: Subset<T, ProductPurchaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductPurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductPurchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductPurchaseAggregateArgs>(args: Subset<T, ProductPurchaseAggregateArgs>): Prisma.PrismaPromise<GetProductPurchaseAggregateType<T>>

    /**
     * Group by ProductPurchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPurchaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductPurchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductPurchaseGroupByArgs['orderBy'] }
        : { orderBy?: ProductPurchaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductPurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductPurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductPurchase model
   */
  readonly fields: ProductPurchaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductPurchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductPurchaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductPurchase model
   */
  interface ProductPurchaseFieldRefs {
    readonly id: FieldRef<"ProductPurchase", 'String'>
    readonly userId: FieldRef<"ProductPurchase", 'String'>
    readonly productId: FieldRef<"ProductPurchase", 'String'>
    readonly price: FieldRef<"ProductPurchase", 'Float'>
    readonly quantity: FieldRef<"ProductPurchase", 'Int'>
    readonly timestamp: FieldRef<"ProductPurchase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductPurchase findUnique
   */
  export type ProductPurchaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * Filter, which ProductPurchase to fetch.
     */
    where: ProductPurchaseWhereUniqueInput
  }

  /**
   * ProductPurchase findUniqueOrThrow
   */
  export type ProductPurchaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * Filter, which ProductPurchase to fetch.
     */
    where: ProductPurchaseWhereUniqueInput
  }

  /**
   * ProductPurchase findFirst
   */
  export type ProductPurchaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * Filter, which ProductPurchase to fetch.
     */
    where?: ProductPurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPurchases to fetch.
     */
    orderBy?: ProductPurchaseOrderByWithRelationInput | ProductPurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductPurchases.
     */
    cursor?: ProductPurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductPurchases.
     */
    distinct?: ProductPurchaseScalarFieldEnum | ProductPurchaseScalarFieldEnum[]
  }

  /**
   * ProductPurchase findFirstOrThrow
   */
  export type ProductPurchaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * Filter, which ProductPurchase to fetch.
     */
    where?: ProductPurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPurchases to fetch.
     */
    orderBy?: ProductPurchaseOrderByWithRelationInput | ProductPurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductPurchases.
     */
    cursor?: ProductPurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductPurchases.
     */
    distinct?: ProductPurchaseScalarFieldEnum | ProductPurchaseScalarFieldEnum[]
  }

  /**
   * ProductPurchase findMany
   */
  export type ProductPurchaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * Filter, which ProductPurchases to fetch.
     */
    where?: ProductPurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPurchases to fetch.
     */
    orderBy?: ProductPurchaseOrderByWithRelationInput | ProductPurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductPurchases.
     */
    cursor?: ProductPurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductPurchases.
     */
    distinct?: ProductPurchaseScalarFieldEnum | ProductPurchaseScalarFieldEnum[]
  }

  /**
   * ProductPurchase create
   */
  export type ProductPurchaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * The data needed to create a ProductPurchase.
     */
    data: XOR<ProductPurchaseCreateInput, ProductPurchaseUncheckedCreateInput>
  }

  /**
   * ProductPurchase createMany
   */
  export type ProductPurchaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductPurchases.
     */
    data: ProductPurchaseCreateManyInput | ProductPurchaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductPurchase createManyAndReturn
   */
  export type ProductPurchaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * The data used to create many ProductPurchases.
     */
    data: ProductPurchaseCreateManyInput | ProductPurchaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductPurchase update
   */
  export type ProductPurchaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * The data needed to update a ProductPurchase.
     */
    data: XOR<ProductPurchaseUpdateInput, ProductPurchaseUncheckedUpdateInput>
    /**
     * Choose, which ProductPurchase to update.
     */
    where: ProductPurchaseWhereUniqueInput
  }

  /**
   * ProductPurchase updateMany
   */
  export type ProductPurchaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductPurchases.
     */
    data: XOR<ProductPurchaseUpdateManyMutationInput, ProductPurchaseUncheckedUpdateManyInput>
    /**
     * Filter which ProductPurchases to update
     */
    where?: ProductPurchaseWhereInput
    /**
     * Limit how many ProductPurchases to update.
     */
    limit?: number
  }

  /**
   * ProductPurchase updateManyAndReturn
   */
  export type ProductPurchaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * The data used to update ProductPurchases.
     */
    data: XOR<ProductPurchaseUpdateManyMutationInput, ProductPurchaseUncheckedUpdateManyInput>
    /**
     * Filter which ProductPurchases to update
     */
    where?: ProductPurchaseWhereInput
    /**
     * Limit how many ProductPurchases to update.
     */
    limit?: number
  }

  /**
   * ProductPurchase upsert
   */
  export type ProductPurchaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * The filter to search for the ProductPurchase to update in case it exists.
     */
    where: ProductPurchaseWhereUniqueInput
    /**
     * In case the ProductPurchase found by the `where` argument doesn't exist, create a new ProductPurchase with this data.
     */
    create: XOR<ProductPurchaseCreateInput, ProductPurchaseUncheckedCreateInput>
    /**
     * In case the ProductPurchase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductPurchaseUpdateInput, ProductPurchaseUncheckedUpdateInput>
  }

  /**
   * ProductPurchase delete
   */
  export type ProductPurchaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
    /**
     * Filter which ProductPurchase to delete.
     */
    where: ProductPurchaseWhereUniqueInput
  }

  /**
   * ProductPurchase deleteMany
   */
  export type ProductPurchaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductPurchases to delete
     */
    where?: ProductPurchaseWhereInput
    /**
     * Limit how many ProductPurchases to delete.
     */
    limit?: number
  }

  /**
   * ProductPurchase without action
   */
  export type ProductPurchaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPurchase
     */
    select?: ProductPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPurchase
     */
    omit?: ProductPurchaseOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProductViewScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    timestamp: 'timestamp'
  };

  export type ProductViewScalarFieldEnum = (typeof ProductViewScalarFieldEnum)[keyof typeof ProductViewScalarFieldEnum]


  export const ProductPurchaseScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    price: 'price',
    quantity: 'quantity',
    timestamp: 'timestamp'
  };

  export type ProductPurchaseScalarFieldEnum = (typeof ProductPurchaseScalarFieldEnum)[keyof typeof ProductPurchaseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ProductViewWhereInput = {
    AND?: ProductViewWhereInput | ProductViewWhereInput[]
    OR?: ProductViewWhereInput[]
    NOT?: ProductViewWhereInput | ProductViewWhereInput[]
    id?: StringFilter<"ProductView"> | string
    userId?: StringFilter<"ProductView"> | string
    productId?: StringFilter<"ProductView"> | string
    timestamp?: DateTimeFilter<"ProductView"> | Date | string
  }

  export type ProductViewOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    timestamp?: SortOrder
  }

  export type ProductViewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductViewWhereInput | ProductViewWhereInput[]
    OR?: ProductViewWhereInput[]
    NOT?: ProductViewWhereInput | ProductViewWhereInput[]
    userId?: StringFilter<"ProductView"> | string
    productId?: StringFilter<"ProductView"> | string
    timestamp?: DateTimeFilter<"ProductView"> | Date | string
  }, "id">

  export type ProductViewOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    timestamp?: SortOrder
    _count?: ProductViewCountOrderByAggregateInput
    _max?: ProductViewMaxOrderByAggregateInput
    _min?: ProductViewMinOrderByAggregateInput
  }

  export type ProductViewScalarWhereWithAggregatesInput = {
    AND?: ProductViewScalarWhereWithAggregatesInput | ProductViewScalarWhereWithAggregatesInput[]
    OR?: ProductViewScalarWhereWithAggregatesInput[]
    NOT?: ProductViewScalarWhereWithAggregatesInput | ProductViewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductView"> | string
    userId?: StringWithAggregatesFilter<"ProductView"> | string
    productId?: StringWithAggregatesFilter<"ProductView"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ProductView"> | Date | string
  }

  export type ProductPurchaseWhereInput = {
    AND?: ProductPurchaseWhereInput | ProductPurchaseWhereInput[]
    OR?: ProductPurchaseWhereInput[]
    NOT?: ProductPurchaseWhereInput | ProductPurchaseWhereInput[]
    id?: StringFilter<"ProductPurchase"> | string
    userId?: StringFilter<"ProductPurchase"> | string
    productId?: StringFilter<"ProductPurchase"> | string
    price?: FloatFilter<"ProductPurchase"> | number
    quantity?: IntFilter<"ProductPurchase"> | number
    timestamp?: DateTimeFilter<"ProductPurchase"> | Date | string
  }

  export type ProductPurchaseOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    timestamp?: SortOrder
  }

  export type ProductPurchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductPurchaseWhereInput | ProductPurchaseWhereInput[]
    OR?: ProductPurchaseWhereInput[]
    NOT?: ProductPurchaseWhereInput | ProductPurchaseWhereInput[]
    userId?: StringFilter<"ProductPurchase"> | string
    productId?: StringFilter<"ProductPurchase"> | string
    price?: FloatFilter<"ProductPurchase"> | number
    quantity?: IntFilter<"ProductPurchase"> | number
    timestamp?: DateTimeFilter<"ProductPurchase"> | Date | string
  }, "id">

  export type ProductPurchaseOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    timestamp?: SortOrder
    _count?: ProductPurchaseCountOrderByAggregateInput
    _avg?: ProductPurchaseAvgOrderByAggregateInput
    _max?: ProductPurchaseMaxOrderByAggregateInput
    _min?: ProductPurchaseMinOrderByAggregateInput
    _sum?: ProductPurchaseSumOrderByAggregateInput
  }

  export type ProductPurchaseScalarWhereWithAggregatesInput = {
    AND?: ProductPurchaseScalarWhereWithAggregatesInput | ProductPurchaseScalarWhereWithAggregatesInput[]
    OR?: ProductPurchaseScalarWhereWithAggregatesInput[]
    NOT?: ProductPurchaseScalarWhereWithAggregatesInput | ProductPurchaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductPurchase"> | string
    userId?: StringWithAggregatesFilter<"ProductPurchase"> | string
    productId?: StringWithAggregatesFilter<"ProductPurchase"> | string
    price?: FloatWithAggregatesFilter<"ProductPurchase"> | number
    quantity?: IntWithAggregatesFilter<"ProductPurchase"> | number
    timestamp?: DateTimeWithAggregatesFilter<"ProductPurchase"> | Date | string
  }

  export type ProductViewCreateInput = {
    id?: string
    userId: string
    productId: string
    timestamp?: Date | string
  }

  export type ProductViewUncheckedCreateInput = {
    id?: string
    userId: string
    productId: string
    timestamp?: Date | string
  }

  export type ProductViewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductViewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductViewCreateManyInput = {
    id?: string
    userId: string
    productId: string
    timestamp?: Date | string
  }

  export type ProductViewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductViewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPurchaseCreateInput = {
    id?: string
    userId: string
    productId: string
    price: number
    quantity: number
    timestamp?: Date | string
  }

  export type ProductPurchaseUncheckedCreateInput = {
    id?: string
    userId: string
    productId: string
    price: number
    quantity: number
    timestamp?: Date | string
  }

  export type ProductPurchaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPurchaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPurchaseCreateManyInput = {
    id?: string
    userId: string
    productId: string
    price: number
    quantity: number
    timestamp?: Date | string
  }

  export type ProductPurchaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPurchaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProductViewCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    timestamp?: SortOrder
  }

  export type ProductViewMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    timestamp?: SortOrder
  }

  export type ProductViewMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    timestamp?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProductPurchaseCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    timestamp?: SortOrder
  }

  export type ProductPurchaseAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
  }

  export type ProductPurchaseMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    timestamp?: SortOrder
  }

  export type ProductPurchaseMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    timestamp?: SortOrder
  }

  export type ProductPurchaseSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}