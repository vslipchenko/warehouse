import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  imports: [TableModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  protected readonly mockValues = [
    {
      name: 'John Doe',
      country: { name: 'USA' },
      company: 'TechCorp',
      representative: { name: 'Alice' },
    },
    {
      name: 'Jane Smith',
      country: { name: 'Canada' },
      company: 'Innovate Inc.',
      representative: { name: 'Bob' },
    },
    {
      name: 'Carlos Ruiz',
      country: { name: 'Mexico' },
      company: 'BuildIt',
      representative: { name: 'Charlie' },
    },
    {
      name: 'Anna Müller',
      country: { name: 'Germany' },
      company: 'DesignPro',
      representative: { name: 'Diana' },
    },
    {
      name: 'Yuki Tanaka',
      country: { name: 'Japan' },
      company: 'FutureWorks',
      representative: { name: 'Eve' },
    },
    {
      name: 'John Doe',
      country: { name: 'USA' },
      company: 'TechCorp',
      representative: { name: 'Alice' },
    },
    {
      name: 'Jane Smith',
      country: { name: 'Canada' },
      company: 'Innovate Inc.',
      representative: { name: 'Bob' },
    },
    {
      name: 'Carlos Ruiz',
      country: { name: 'Mexico' },
      company: 'BuildIt',
      representative: { name: 'Charlie' },
    },
    {
      name: 'Anna Müller',
      country: { name: 'Germany' },
      company: 'DesignPro',
      representative: { name: 'Diana' },
    },
    {
      name: 'Yuki Tanaka',
      country: { name: 'Japan' },
      company: 'FutureWorks',
      representative: { name: 'Eve' },
    },
    {
      name: 'John Doe',
      country: { name: 'USA' },
      company: 'TechCorp',
      representative: { name: 'Alice' },
    },
    {
      name: 'Jane Smith',
      country: { name: 'Canada' },
      company: 'Innovate Inc.',
      representative: { name: 'Bob' },
    },
    {
      name: 'Carlos Ruiz',
      country: { name: 'Mexico' },
      company: 'BuildIt',
      representative: { name: 'Charlie' },
    },
    {
      name: 'Anna Müller',
      country: { name: 'Germany' },
      company: 'DesignPro',
      representative: { name: 'Diana' },
    },
    {
      name: 'Yuki Tanaka',
      country: { name: 'Japan' },
      company: 'FutureWorks',
      representative: { name: 'Eve' },
    },
    {
      name: 'John Doe',
      country: { name: 'USA' },
      company: 'TechCorp',
      representative: { name: 'Alice' },
    },
    {
      name: 'Jane Smith',
      country: { name: 'Canada' },
      company: 'Innovate Inc.',
      representative: { name: 'Bob' },
    },
    {
      name: 'Carlos Ruiz',
      country: { name: 'Mexico' },
      company: 'BuildIt',
      representative: { name: 'Charlie' },
    },
    {
      name: 'Anna Müller',
      country: { name: 'Germany' },
      company: 'DesignPro',
      representative: { name: 'Diana' },
    },
    {
      name: 'Yuki Tanaka',
      country: { name: 'Japan' },
      company: 'FutureWorks',
      representative: { name: 'Eve' },
    },
    {
      name: 'John Doe',
      country: { name: 'USA' },
      company: 'TechCorp',
      representative: { name: 'Alice' },
    },
    {
      name: 'Jane Smith',
      country: { name: 'Canada' },
      company: 'Innovate Inc.',
      representative: { name: 'Bob' },
    },
    {
      name: 'Carlos Ruiz',
      country: { name: 'Mexico' },
      company: 'BuildIt',
      representative: { name: 'Charlie' },
    },
    {
      name: 'Anna Müller',
      country: { name: 'Germany' },
      company: 'DesignPro',
      representative: { name: 'Diana' },
    },
    {
      name: 'Yuki Tanaka',
      country: { name: 'Japan' },
      company: 'FutureWorks',
      representative: { name: 'Eve' },
    },
    {
      name: 'John Doe',
      country: { name: 'USA' },
      company: 'TechCorp',
      representative: { name: 'Alice' },
    },
    {
      name: 'Jane Smith',
      country: { name: 'Canada' },
      company: 'Innovate Inc.',
      representative: { name: 'Bob' },
    },
    {
      name: 'Carlos Ruiz',
      country: { name: 'Mexico' },
      company: 'BuildIt',
      representative: { name: 'Charlie' },
    },
    {
      name: 'Anna Müller',
      country: { name: 'Germany' },
      company: 'DesignPro',
      representative: { name: 'Diana' },
    },
    {
      name: 'Yuki Tanaka',
      country: { name: 'Japan' },
      company: 'FutureWorks',
      representative: { name: 'Eve' },
    },
    {
      name: 'John Doe',
      country: { name: 'USA' },
      company: 'TechCorp',
      representative: { name: 'Alice' },
    },
    {
      name: 'Jane Smith',
      country: { name: 'Canada' },
      company: 'Innovate Inc.',
      representative: { name: 'Bob' },
    },
    {
      name: 'Carlos Ruiz',
      country: { name: 'Mexico' },
      company: 'BuildIt',
      representative: { name: 'Charlie' },
    },
    {
      name: 'Anna Müller',
      country: { name: 'Germany' },
      company: 'DesignPro',
      representative: { name: 'Diana' },
    },
    {
      name: 'Yuki Tanaka',
      country: { name: 'Japan' },
      company: 'FutureWorks',
      representative: { name: 'Eve' },
    },
  ];
}
