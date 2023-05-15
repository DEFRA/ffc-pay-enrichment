Feature: Enrich Payment Request

  Scenario: Enrich Request
    Given a valid payment request is received containing details
      | dueDate     | 2022-12-01                 |
      | description | G00 - Gross value of claim |
      | accountCode | SOS273                     |
    When the payment request is enriched
    Then the enriched payment request should be transformed to:
      | scheme      | SFI                        |
      | ledger      | AP                         |
      | dueDate     | 01/12/2022                 |
      | description | G00 - Gross value of claim |
      | accountCode | SOS273                     |
