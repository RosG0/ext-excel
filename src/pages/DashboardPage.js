import {Page} from '@core/page/Page';
import {$} from '@core/dom';
import {crateRecordsTable} from '@/pages/dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'db').html(`
        <div class="dashboard__header">
            <h1>Excel Dashboard</h1>
        </div>
        <div class="dashboard__new">
            <div class="dashboard__view">
                <a href="#excel${now}" class="dashboard__create">
                    Новая <br/> таблица
                </a>
            </div>
        </div>
        <div class="dashboard__tables dashboard__view">
            ${crateRecordsTable()}
        </div>
    `);
  }
}
