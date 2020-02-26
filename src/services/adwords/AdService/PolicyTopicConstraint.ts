import { PolicyTopicConstraint } from './enum/PolicyTopicConstraint';
import { IAttributes } from '../../../types/adwords/Attributes';

interface IPolicyTopicConstraintRaw<Type> extends IAttributes<Type> {
  constraintType: PolicyTopicConstraint.PolicyTopicConstraintType;
  'PolicyTopicConstraint.Type ': string;
}

interface IPolicyTopicConstraint<Type = ''> extends Partial<IPolicyTopicConstraintRaw<Type>> {}

interface ICertificateDomainMismatchConstraint
  extends Partial<IPolicyTopicConstraintRaw<'CertificateDomainMismatchConstraint'>> {}

interface ICertificateMissingConstraint extends Partial<IPolicyTopicConstraintRaw<'CertificateMissingConstraint'>> {}

interface IResellerConstraint extends Partial<IPolicyTopicConstraintRaw<'ResellerConstraint'>> {}

interface ICountryConstraintRaw<Type = ''> extends Partial<IPolicyTopicConstraintRaw<Type>> {
  constrainedCountries: number[];
  totalTargetedCountries: number;
}

interface ICountryConstraint<Type = ''> extends Partial<ICountryConstraintRaw<Type>> {}

interface ICertificateDomainMismatchInCountryConstraint
  extends Partial<ICountryConstraintRaw<'CertificateDomainMismatchInCountryConstraint'>> {}

interface ICertificateMissingInCountryConstraint
  extends Partial<ICountryConstraintRaw<'CertificateMissingInCountryConstraint'>> {}

type PartialPolicyTopicConstraint = Partial<
  | IPolicyTopicConstraint
  | ICertificateDomainMismatchConstraint
  | ICertificateMissingConstraint
  | IResellerConstraint
  | ICountryConstraint
  | ICertificateDomainMismatchInCountryConstraint
  | ICertificateMissingInCountryConstraint
>;

export {
  IPolicyTopicConstraint,
  IPolicyTopicConstraintRaw,
  ICertificateDomainMismatchConstraint,
  ICertificateMissingConstraint,
  IResellerConstraint,
  ICountryConstraint,
  ICountryConstraintRaw,
  ICertificateDomainMismatchInCountryConstraint,
  ICertificateMissingInCountryConstraint,
  PartialPolicyTopicConstraint,
};
