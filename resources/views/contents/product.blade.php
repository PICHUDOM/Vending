@extends('layouts.app-nav')
@section('content')
    <div class="content">
        <div class="container">
            <div class="page-title">
                <h3 id="myTab" role="tablist">Product
                    <a class="btn btn-sm btn-outline-primary float-end" href="/create_product" aria-selected="false">
                        <i class="fas fa-plus-circle"></i><span class="btn-header" "> Add Product</span>
                    </a>
                 </h3>
              </div>
              <div class="box box-primary">
                 <div class="box-body">
                    <div class="tab-content" id="myTabContent">
                       <form action="{{ url('/products-price') }}" method="post" enctype="multipart/form-data">
                          <div class="text-end">
                             <button class="btn btn-sm btn-outline-primary float-end" type="submit"><i class="fas fa-plus-circle"></i> Add Or
                             Update</button>
                          </div>
                          @csrf
                          <table width="100%" class="table table-hover" id="dataTables-example">
                            {{-- id="dataTables-example" --}}
                             <thead>
                                <tr>
                                   <th>#</th>
                                   <th>Image</th>
                                   <th>Product Name</th>
                                   <th>Expiry Date</th>
                                   <th>Type</th>
                                   <th>Price In</th>
                                   <th>Price Out</th>
                                   <th>Action</th>
                                </tr>
                             </thead>
                             <tbody>
                                  @foreach ($data as $product)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>
                                    <img src="{{ asset('public/' . $product->p_image) }}" alt="{{ $product->p_image }}" style="max-width: 60px; max-height: 69px;">

                                </td>
                                <td>{{ $product->p_name }}</td>
                                <td>{{ $product->expiry_date }}</td>
                                <td>{{ $product->pro_category->type ?? '' }}</td>
                                <td>
                                    <div class="mb-3 col-md-8">
                                        <div class="input-group">
                                            <span class="input-group-text">៛</span>
                                            <input type="number" name="price_in[]"
                                                value="{{ $product->producPrice->price_in ?? '' }}" class="form-control">
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="mb-3 col-md-8">
                                        <input type="hidden" name="product_id[]" value="{{ $product->id }}">
                                        <div class="input-group">
                                            <span class="input-group-text">៛</span>
                                            <input type="number" name="price_out[]"
                                                value="{{ $product->producPrice->price_out ?? '' }}" class="form-control">
                                        </div>
                                    </div>
                                </td>
                                {{-- <td>Active</td> --}}
                                <td>
                                    <a href="{{ url('edit_product/' . $product->id) }}"
                                        class="btn btn-outline-info btn-rounded"><i class="fas fa-pen"></i></a>
                                    <a href="product/destroy/{{ $product->id }}"
                                        class="btn btn-outline-danger btn-rounded"
                                        onclick="return confirm('{{ __('Are you sure you want to deleted?') }}')"><i
                                            class="fas fa-trash"></i></a>
                                </td>
                            </tr>
                            @endforeach
                            </tbody>
                            </table>
                            </form>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
@endsection
