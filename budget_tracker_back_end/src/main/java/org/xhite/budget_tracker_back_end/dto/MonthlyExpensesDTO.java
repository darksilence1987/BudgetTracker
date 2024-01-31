package org.xhite.budget_tracker_back_end.dto;

import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MonthlyExpensesDTO {
    private String month;
    private String year;
    private List<ExpenseDTO> expenses;
}