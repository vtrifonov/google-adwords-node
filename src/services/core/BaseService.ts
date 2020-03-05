import { IAttributes } from './../../types/adwords/Attributes';
import { SoapService, ISoapServiceOpts } from './SoapService';
import { AdwordsOperationService } from './AdwordsOperationService';
import { ISelector, IOperation, IPaging, IPredicate } from '../../types/adwords';
import { Operator, Predicate } from '../../types/enum';
import { IListReturnValue, IPage } from '../../types/abstract';

export interface IOperationServiceOptions {
  soapService: SoapService;
}

export interface IServiceInfo {
  idField?: string;
  operationType: string;
  selectorFields: string[];
}

export abstract class BaseService<T, TName> extends AdwordsOperationService {
  public static readonly namespace;
  protected readonly soapService: SoapService;
  protected readonly serviceInfo: IServiceInfo;

  constructor(options: IOperationServiceOptions, serviceInfo: IServiceInfo) {
    super();
    this.soapService = options.soapService;
    this.serviceInfo = serviceInfo;
  }

  public async getAll(paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: this.serviceInfo.selectorFields,
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getByAdIds(ids: string[], paging?: IPaging) {
    if (!this.serviceInfo.idField) {
      return Promise.reject('Id select not supported by this service type');
    }
    const serviceSelector: ISelector = {
      fields: this.serviceInfo.selectorFields,
      predicates: [
        {
          field: this.serviceInfo.idField,
          operator: Predicate.Operator.IN,
          values: ids,
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public add(operands: T[]) {
    const operations: Array<IOperation<T, TName>> = operands.map((operand: T) => {
      const operation: IOperation<T, TName> = {
        operator: Operator.ADD,
        operand: this.setType(operand),
      };
      return operation;
    });
    return this.mutate(operations);
  }

  public update(operands: T[]) {
    const operations: Array<IOperation<T, TName>> = operands.map((operand: T) => {
      const operation: IOperation<T, TName> = {
        operator: Operator.SET,
        operand,
      };
      return operation;
    });
    return this.mutate(operations);
  }

  public async getByPredicates(predicates: IPredicate[], paging?: IPaging): Promise<IPage<T>> {
    const serviceSelector: ISelector = {
      fields: this.serviceInfo.selectorFields,
      predicates,
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  protected setType(operand: T): T {
    return operand;
  }

  protected async get<ServiceSelector = ISelector, Rval = IPage<T>>(serviceSelector: ServiceSelector): Promise<Rval> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval) => {
      return rval;
    });
  }

  protected async mutate<MutateOperation = IOperation<T, TName>, Rval = IListReturnValue<T>>(
    operations: MutateOperation[],
  ): Promise<Rval> {
    return this.soapService
      .mutateAsync<MutateOperation, Rval>(operations, this.serviceInfo.operationType)
      .then((rval) => {
        return rval;
      });
  }
}
