export const cartCardCollapsed = `<div class="sidebar-cards card">
    <div class="card-body">
        <div class="row">
            <div class="col">
                <img
                    src='%%IMAGE%%'
                    alt='%%NAME%%' style="width: 80px; height: 80px;">
                </div>
        </div>
        <div class="row">
            <div class="text-center col">
                %%PLUSMINUS%%
                <div class="small btn-remove">Remove</div>
            </div>
        </div>
    </div>
</div>`;
export const cartCardExpanded = `
<div class="card-body">
      <div class="row">
        <div class="col">
          <img
            src="%%IMAGE%%"
            alt="%%NAME%%"
            style="width: 80px; height: 80px"
          />
        </div>
        <div class="col">
          <div>%%PRICE</div>
          <div>%%NAME%%</div>
        </div>
      </div>
      <div class="row">
        <div class="text-center col">
        %%PLUSMINUS%%
          <div class="small btn-remove">Remove</div>
        </div>
      </div>
    </div>`