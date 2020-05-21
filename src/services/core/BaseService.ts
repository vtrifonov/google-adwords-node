import { AdwordsOperationService } from './AdwordsOperationService';
import { ISelector, IOperation, IPaging, IPredicate } from '../../types/adwords';
import { Operator, Predicate } from '../../types/enum';
import { IListReturnValue, IPage } from '../../types/abstract';
import { IOperationServiceOptions } from './OperationServiceOptions';
import { IServiceInfo } from './ServiceInfo';

export abstract class BaseService<T, TName> extends AdwordsOperationService {
  public static readonly namespace;

  constructor(
    protected readonly operationServiceOptions: IOperationServiceOptions,
    protected readonly serviceInfo: IServiceInfo,
  ) {
    super();
    this.operationServiceOptions = operationServiceOptions;
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

  public async getByIds(ids: string[], paging?: IPaging) {
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

  public async getAllIds(): Promise<string[]> {
    return this.getIds();
  }

  public add(operands: T[]) {
    const operations: Array<IOperation<T, TName>> = operands.map((operand: T) => {
      if (this.needToSetAttribute(operand)) {
        operand = this.setType(operand);
      }
      const operation: IOperation<T, TName> = {
        operator: Operator.ADD,
        operand,
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

  public delete(operands: T[]) {
    const operations: Array<IOperation<T, TName>> = operands.map((operand: T) => {
      const operation: IOperation<T, TName> = {
        operator: Operator.REMOVE,
        operand,
      };
      return operation;
    });
    return this.mutate(operations);
  }

  public async getByPredicates(
    predicates: IPredicate[],
    paging?: IPaging,
    selectorFields?: string[],
  ): Promise<IPage<T>> {
    const serviceSelector: ISelector = {
      fields: selectorFields ? selectorFields : this.serviceInfo.selectorFields,
      predicates,
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async mutate<MutateOperation = IOperation<T, TName>, Rval = IListReturnValue<T>>(
    operations: MutateOperation[],
  ): Promise<Rval> {
    return this.operationServiceOptions.soapService
      .mutateAsync<MutateOperation, Rval>(
        operations,
        this.serviceInfo.operationType,
        this.serviceInfo.modifyMutateInputOperand,
      )
      .then((rval) => {
        return rval;
      });
  }

  protected async getIds(predicates?: IPredicate[]): Promise<string[]> {
    const idSelectField = this.serviceInfo.idField || 'Id';
    const serviceSelector: ISelector = {
      fields: [idSelectField],
    };

    if (predicates) {
      serviceSelector.predicates = predicates;
    }

    const idFieldValue = idSelectField.charAt(0).toLowerCase() + idSelectField.slice(1);
    const result = await this.get(serviceSelector);
    return (result.entries && result.entries.map((x) => (x[idFieldValue] || '').toString())) || [];
  }

  protected setType(operand: T): T {
    return operand;
  }

  protected needToSetAttribute(operand: T): boolean {
    return !(operand as any).attributes || !(operand as any).attributes['xsi:type'];
  }

  protected async get<ServiceSelector = ISelector, Rval = IPage<T>>(serviceSelector: ServiceSelector): Promise<Rval> {
    return this.operationServiceOptions.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval) => {
      return rval;
    });
  }
}
