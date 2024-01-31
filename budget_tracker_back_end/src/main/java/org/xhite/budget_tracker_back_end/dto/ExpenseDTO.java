package org.xhite.budget_tracker_back_end.dto;

import lombok.*;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExpenseDTO {
    private Long id;
    private String title;
    private String category;
    private double amount;
    private LocalDate date;

}