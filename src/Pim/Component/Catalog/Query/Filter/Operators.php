<?php

namespace Pim\Component\Catalog\Query\Filter;

/**
 * Filter operators
 *
 * @author    Julien Sanchez <julien@akeneo.com>
 * @copyright 2014 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class Operators
{
    const STARTS_WITH = 'STARTS WITH';
    const ENDS_WITH = 'ENDS WITH';
    const CONTAINS = 'CONTAINS';
    const DOES_NOT_CONTAIN = 'DOES NOT CONTAIN';
    const IS_EMPTY = 'EMPTY';
    const IS_NOT_EMPTY = 'NOT EMPTY';
    const IN_LIST = 'IN';
    const NOT_IN_LIST = 'NOT IN';
    const IN_CHILDREN_LIST = 'IN CHILDREN';
    const NOT_IN_CHILDREN_LIST = 'NOT IN CHILDREN';
    const UNCLASSIFIED = 'UNCLASSIFIED';
    const IN_LIST_OR_UNCLASSIFIED = 'IN OR UNCLASSIFIED';
    const IN_ARRAY_KEYS = 'IN ARRAY KEYS';
    const BETWEEN = 'BETWEEN';
    const NOT_BETWEEN = 'NOT BETWEEN';
    const IS_NULL = 'NULL';
    const IS_NOT_NULL = 'NOT NULL';
    const IS_LIKE = 'LIKE';
    const IS_NOT_LIKE = 'NOT LIKE';
    const GREATER_THAN = '>';
    const GREATER_OR_EQUAL_THAN = '>=';
    const LOWER_THAN = '<';
    const LOWER_OR_EQUAL_THAN = '<=';
    const EQUALS = '=';
    const NOT_EQUAL = '!=';
    const SINCE_LAST_N_DAYS = 'SINCE LAST N DAYS';
    const SINCE_LAST_JOB = 'SINCE LAST JOB';
    const NOT_EQUALS_ON_AT_LEAST_ONE_LOCALE = 'NOT EQUALS ON AT LEAST ONE LOCALE';
    const EQUALS_ON_AT_LEAST_ONE_LOCALE = 'EQUALS ON AT LEAST ONE LOCALE';
    const GREATER_THAN_ON_AT_LEAST_ONE_LOCALE = 'GREATER THAN ON AT LEAST ONE LOCALE';
    const GREATER_OR_EQUALS_THAN_ON_AT_LEAST_ONE_LOCALE = 'GREATER OR EQUALS THAN ON AT LEAST ONE LOCALE';
    const LOWER_OR_EQUALS_THAN_ON_AT_LEAST_ONE_LOCALE = 'LOWER OR EQUALS THAN ON AT LEAST ONE LOCALE';
    const LOWER_THAN_ON_AT_LEAST_ONE_LOCALE = 'LOWER THAN ON AT LEAST ONE LOCALE';
    const GREATER_THAN_ON_ALL_LOCALES = 'GREATER THAN ON ALL LOCALES';
    const GREATER_OR_EQUALS_THAN_ON_ALL_LOCALES = 'GREATER OR EQUALS THAN ON ALL LOCALES';
    const LOWER_OR_EQUALS_THAN_ON_ALL_LOCALES = 'LOWER OR EQUALS THAN ON ALL LOCALES';
    const LOWER_THAN_ON_ALL_LOCALES = 'LOWER THAN ON ALL LOCALES';
    const IS_EMPTY_FOR_CURRENCY = 'EMPTY FOR CURRENCY';
    const IS_EMPTY_ON_ALL_CURRENCIES = 'EMPTY ON ALL CURRENCIES';
    const IS_NOT_EMPTY_FOR_CURRENCY = 'NOT EMPTY FOR CURRENCY';
    const IS_NOT_EMPTY_ON_AT_LEAST_ONE_CURRENCY = 'NOT EMPTY ON AT LEAST ONE CURRENCY';
}
